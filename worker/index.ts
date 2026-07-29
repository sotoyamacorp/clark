// サイトの静的配信(Astro build済みdist/)に加えて、チャットボットAPIを提供するWorkerエントリーポイント。
// wrangler.jsoncの`main`にこのファイルを指定し、`assets.binding`経由でenv.ASSETS.fetch()に
// 静的アセットの配信を委譲する(/api/*以外はすべて素通しでdist/を返す)。
interface WorkerEnv extends Env {
  // Cloudflareのシークレットとして`wrangler secret put BUTTONDOWN_API_KEY`で登録する。
  // 未設定でもチャット自体は動作する(リード登録だけスキップされる)。
  BUTTONDOWN_API_KEY?: string;
  // `wrangler secret put ADMIN_KEY`で登録する。/admin/chat-logs へのアクセス用の合言葉。
  // 未設定の場合、/admin/chat-logs は常に401を返す(誤って無防備に公開されないため)。
  ADMIN_KEY?: string;
}

type Locale = 'ja' | 'en';

interface CorpusEntry {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  url: string;
  text: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MAX_MESSAGE_LENGTH = 600;
const MAX_HISTORY_MESSAGES = 6;
const TOP_K_ARTICLES = 4;
const MAX_ARTICLE_CHARS_IN_PROMPT = 900;
const CHAT_MODEL = '@cf/meta/llama-3.3-70b-instruct-fp8-fast';

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });
}

// 日本語は単語分かち書きがないため、クエリの2文字bigramが記事本文に
// 含まれるかで簡易的な関連度スコアを付ける(形態素解析器を導入しないための割り切り)。
function scoreEntry(query: string, entry: CorpusEntry): number {
  const haystack = `${entry.title} ${entry.description} ${entry.text}`.toLowerCase();
  const q = query.toLowerCase().replace(/\s+/g, '');
  if (q.length < 2) return 0;

  let score = 0;
  for (let i = 0; i <= q.length - 2; i++) {
    const gram = q.slice(i, i + 2);
    if (haystack.includes(gram)) score++;
  }
  return score;
}

async function loadCorpus(request: Request, env: WorkerEnv): Promise<CorpusEntry[]> {
  const assetUrl = new URL('/chat-corpus.json', request.url);
  const res = await env.ASSETS.fetch(new Request(assetUrl));
  if (!res.ok) return [];
  return res.json();
}

function buildSystemPrompt(locale: Locale, matches: CorpusEntry[]): string {
  const context = matches
    .map((m) => `## ${m.title}\n${m.text.slice(0, MAX_ARTICLE_CHARS_IN_PROMPT)}\n(URL: ${m.url})`)
    .join('\n\n');

  if (locale === 'en') {
    return `You are the AI assistant for "PH Clark Times" (ph.sotoyamacorp.com), a media site run by a Filipino-Japanese family for Japanese companies exploring expansion into Clark, Philippines.
Answer the visitor's question in English, in a friendly but professional tone, using ONLY the article context below when it's relevant. If the context doesn't cover the question, say so honestly instead of inventing facts, and suggest browsing /en/articles or reaching out via /en/contact.
Keep answers concise (a few sentences to a short paragraph). When you reference a specific article, mention its URL.

Article context:
${context || '(no closely matching article found)'}`;
  }

  return `あなたは「フィリピン・クラーク通信」(ph.sotoyamacorp.com)のAIアシスタントです。このサイトはフィリピン出身の家族が、フィリピン・クラークへの進出を検討する日本企業向けに運営しているメディアです。
訪問者の質問に日本語で、親しみやすくも専門的なトーンで答えてください。関連する場合のみ以下の記事内容を参考にし、憶測で事実を作らないでください。関連する記事が見当たらない場合は正直にその旨を伝え、/articles の記事一覧や /contact からのお問い合わせを案内してください。
回答は簡潔に(数文〜短い段落程度)。特定の記事を参照した場合は、そのURLも案内してください。

参考記事:
${context || '(関連する記事が見つかりませんでした)'}`;
}

async function logChatExchange(env: WorkerEnv, locale: Locale, email: string, question: string, answer: string) {
  try {
    await env.DB.prepare(
      'INSERT INTO chat_logs (locale, email, question, answer) VALUES (?1, ?2, ?3, ?4)',
    )
      .bind(locale, email || null, question, answer)
      .run();
  } catch (err) {
    // ログ保存の失敗でチャット応答自体は止めないが、原因調査のためconsoleには残す
    console.error('chat_logs insert failed:', err instanceof Error ? err.message : String(err));
  }
}

async function handleChat(request: Request, env: WorkerEnv, ctx: ExecutionContext): Promise<Response> {
  let body: { message?: unknown; history?: unknown; locale?: unknown; email?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  const message = String(body.message ?? '').slice(0, MAX_MESSAGE_LENGTH).trim();
  const locale: Locale = body.locale === 'en' ? 'en' : 'ja';
  const email = String(body.email ?? '').trim().slice(0, 320);
  if (!message) return jsonResponse({ error: 'empty_message' }, 400);

  const rawHistory = Array.isArray(body.history) ? body.history : [];
  const history: ChatMessage[] = rawHistory
    .filter(
      (m): m is ChatMessage =>
        !!m && typeof m === 'object' && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string',
    )
    .slice(-MAX_HISTORY_MESSAGES);

  const corpus = await loadCorpus(request, env);
  const localeCorpus = corpus.filter((entry) => entry.locale === locale);
  const scored = localeCorpus
    .map((entry) => ({ entry, score: scoreEntry(message, entry) }))
    // bigram一致が少数だと無関係な記事も拾いやすいため、最低限のスコアで足切りする
    .filter((x) => x.score >= 3)
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K_ARTICLES)
    .map((x) => x.entry);

  const messages = [
    { role: 'system' as const, content: buildSystemPrompt(locale, scored) },
    ...history,
    { role: 'user' as const, content: message },
  ];

  try {
    const result = await env.AI.run(CHAT_MODEL, { messages, max_tokens: 500 });
    const reply = typeof result === 'object' && result && 'response' in result ? String(result.response ?? '') : '';
    const finalReply =
      reply ||
      (locale === 'en'
        ? 'Sorry, I could not generate a reply. Please try again.'
        : '申し訳ありません、回答を生成できませんでした。もう一度お試しください。');

    ctx.waitUntil(logChatExchange(env, locale, email, message, finalReply));

    return jsonResponse({
      reply: finalReply,
      sources: scored.map((entry) => ({ title: entry.title, url: entry.url })),
    });
  } catch (err) {
    return jsonResponse({ error: 'ai_error', message: err instanceof Error ? err.message : String(err) }, 500);
  }
}

async function handleChatLead(request: Request, env: WorkerEnv): Promise<Response> {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  const email = String(body.email ?? '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return jsonResponse({ error: 'invalid_email' }, 400);
  }

  if (!env.BUTTONDOWN_API_KEY) {
    return jsonResponse({ ok: true, registered: false });
  }

  try {
    const res = await fetch('https://api.buttondown.com/v1/subscribers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Token ${env.BUTTONDOWN_API_KEY}`,
        'X-Buttondown-Collision-Behavior': 'add',
        // Cloudflare Workersの共有送信元IPからの連続リクエストが、Buttondown側の
        // スパム対策firewallに疑わしいと判定されブロックされるため、自前の認証済み
        // サーバーサイド統合として明示的にバイパスする(Buttondown公式ドキュメント推奨の対処)
        'X-Buttondown-Bypass-Firewall': 'true',
      },
      // 無料プランではtagsが使えない(Basic以上限定)ため、notesに印を残して区別する
      body: JSON.stringify({ email_address: email, notes: 'chatbot-lead' }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return jsonResponse({ ok: false, error: 'buttondown_error', detail }, 502);
    }

    return jsonResponse({ ok: true, registered: true });
  } catch {
    return jsonResponse({ ok: false, error: 'network_error' }, 502);
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function handleAdminChatLogs(request: Request, env: WorkerEnv): Promise<Response> {
  const url = new URL(request.url);
  const key = url.searchParams.get('key');

  if (!env.ADMIN_KEY || key !== env.ADMIN_KEY) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { results } = await env.DB.prepare(
    'SELECT id, created_at, locale, email, question, answer FROM chat_logs ORDER BY created_at DESC LIMIT 200',
  ).all<{ id: number; created_at: string; locale: string; email: string | null; question: string; answer: string }>();

  const rows = results
    .map(
      (row) => `
        <tr>
          <td>${escapeHtml(row.created_at)}</td>
          <td>${escapeHtml(row.locale)}</td>
          <td>${row.email ? escapeHtml(row.email) : '<span class="muted">-</span>'}</td>
          <td>${escapeHtml(row.question)}</td>
          <td>${escapeHtml(row.answer)}</td>
        </tr>`,
    )
    .join('');

  const html = `<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8" />
<title>チャットログ | フィリピン・クラーク通信</title>
<meta name="robots" content="noindex, nofollow" />
<style>
  body { font-family: -apple-system, "Hiragino Sans", sans-serif; margin: 0; padding: 2rem; background: #f6f8fb; color: #0b1826; }
  h1 { font-size: 1.25rem; margin-bottom: 0.25rem; }
  p.meta { color: #3d5c82; font-size: 0.85rem; margin-top: 0; margin-bottom: 1.5rem; }
  table { width: 100%; border-collapse: collapse; background: #fff; box-shadow: 0 1px 3px rgba(11,24,38,0.1); }
  th, td { text-align: left; padding: 0.6rem 0.8rem; border-bottom: 1px solid #e6ecf3; vertical-align: top; font-size: 0.85rem; }
  th { background: #0b1826; color: #c2954a; position: sticky; top: 0; }
  tr:hover td { background: #f6f8fb; }
  td:nth-child(4), td:nth-child(5) { max-width: 320px; white-space: pre-wrap; }
  .muted { color: #94a3b8; }
</style>
</head>
<body>
  <h1>チャットログ</h1>
  <p class="meta">新しい順・最大200件</p>
  <table>
    <thead>
      <tr><th>日時</th><th>言語</th><th>メール</th><th>質問</th><th>回答</th></tr>
    </thead>
    <tbody>${rows || '<tr><td colspan="5">まだログがありません</td></tr>'}</tbody>
  </table>
</body>
</html>`;

  return new Response(html, { headers: { 'content-type': 'text/html; charset=utf-8' } });
}

export default {
  async fetch(request: Request, env: WorkerEnv, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/api/chat') {
      return handleChat(request, env, ctx);
    }
    if (request.method === 'GET' && url.pathname === '/admin/chat-logs') {
      return handleAdminChatLogs(request, env);
    }
    if (request.method === 'POST' && url.pathname === '/api/chat-lead') {
      return handleChatLead(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
