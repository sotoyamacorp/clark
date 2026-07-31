# clark-site 技術ガイド

このディレクトリはフィリピン・クラーク発信用Webサイトのコード本体。事業の背景は `../CLAUDE.md` を参照。ここではサイトの技術的な指示のみを扱う。

## 技術スタック(仮・要決定)
- フレームワーク: 未定(候補: Next.js + Markdown / Astro など、静的生成向きのものを想定)
- ホスティング: 未定(候補: Vercel)
- スタイル: 未定(候補: Tailwind CSS)

> 実装開始時にJioが決定した内容へ、このセクションを上書きすること。

## ディレクトリ構成(想定)
```
clark-site/
├── CLAUDE.md
├── src/            # サイトのソースコード
├── content/        # ビルドに取り込む記事(articles/ からの反映先、または直接参照)
├── public/          # 画像等の静的アセット
└── package.json
```

## 記事フォーマット・反映の手順

新規記事は `src/pages/articles/clark-history-and-value.mdx` を**フォーマットのテンプレート**として使うこと。今後追加する記事もこの構成に揃える。

### テンプレートの構成要素
1. フロントマター: `layout: ../../layouts/BaseLayout.astro` / `title` / `description` / `publishedAt` / `author` / `category` / `tags` / `faq`(任意、下記参照)
2. 本文全体を `<div class="max-w-3xl mx-auto px-4 py-12">` で囲む
3. 構成順序:
   - `# タイトル`(h1)
   - `## はじめに`(読者の疑問・課題を一文で提示する導入)
   - `## この記事で分かる◯つのポイント`(番号付きボックスで要点を先出し。`bg-navy-50 border border-navy-200 rounded-lg p-8` + 丸数字アイコン)
   - 本文セクション(`##`見出し。装飾ボックスは `border-l-4 border-accent-500 bg-white p-6 shadow-sm` などで要点を視覚的に区切る)
   - `## まとめ`(次に取るべきステップを番号付きで提示。`bg-navy-900 text-white p-10 rounded-xl` のボックス)
   - `## よくある質問`(任意。AI Overview/ChatGPT等の回答エンジンからの引用を狙う場合に追加。下記「FAQPage構造化データ」参照)
   - `## 出典・参考情報`(箇条書き、末尾に「記事公開日：」を明記)

### FAQPage構造化データ(AEO対策)

2026-08-01にJioの依頼で導入。記事frontmatterに`faq`配列(`q`/`a`のペア、2〜4問程度)を追加すると、`BaseLayout.astro`が自動的にFAQPage構造化データ(JSON-LD)を出力する(`src/lib/schema.ts`の`faqSchema()`)。ChatGPT・Perplexity・Google AI OverviewなどのAI回答エンジンに直接引用されやすくするための対策。

- **frontmatterに`faq`を追加しただけでは不十分。本文にも同じ内容を可視化すること**(Google等の構造化データガイドラインは、JSON-LDと同じ内容がページ上に実際に表示されていることを要求している)。本文側は`## よくある質問`見出しの下に、既存の`border-l-4 border-accent-500 bg-white p-6 shadow-sm`ボックスで質問・回答を並べる(実装例: `src/pages/articles/philippines-fdi-peza-gap-2026.mdx`)。
- 全記事necessaryではない。読者から実際に聞かれそうな定義的な質問(「Xとは何か」「なぜYが起きたのか」)がある記事で使う。
- 英語版記事にも同じ`faq`を機械的に翻訳して追加すること。

### パンくずリスト・og:type(SEO対策)

2026-08-01に導入。以下は記事ページで自動的に処理されるため、記事執筆時に個別対応は不要:
- `BaseLayout.astro`が記事ページ(`publishedAt`があり`/articles/{slug}`形式のURL)を検知すると、パンくずリスト(ホーム>記事>タイトル)を自動表示し、`BreadcrumbList`のJSON-LDも自動出力する。
- 記事ページの`og:type`は自動的に`article`になり、`article:published_time`/`article:modified_time`も自動出力される(トップ・about等の非記事ページは`website`のまま)。
- 記事を大幅に更新した場合は、frontmatterに`updatedAt`(Date型)を追加すると、JSON-LDの`dateModified`に反映される(未指定の場合は`publishedAt`と同じ扱い)。

### 新規記事を追加する手順
1. `src/pages/articles/` に新しい `.mdx` ファイルを作成し、上記テンプレートに沿って執筆する(出典は必ず最低3つ、`content-style.md`のトーンに従う)。
2. `src/lib/articles.ts` の `articles` 配列に**日本語・英語両方の翻訳データ**(`translations.ja` / `translations.en` に `title` / `description` / `tags`)を追加する。トップページと `/articles` 一覧はこの配列を共通で参照しているため、mdxファイルだけでは一覧に出てこない。`region` は `'clark'`(クラーク特化)か `'philippines'`(フィリピン全体のテーマ)のいずれかを必ず指定する(記事カードの地域バッジとフィルタータブ表示に使われる)。
3. **英語版記事を作成する**(下記「多言語対応(i18n)」参照)。`src/pages/en/articles/{slug}.mdx` に、直訳ではなく自然な英語で執筆する。
4. **OG画像を生成する**(下記「OG画像の生成方法」参照)。生成したPNGを `public/og/{slug}.png` に配置し、記事フロントマターに `ogImage: "/og/{slug}.png"` を追加する。省略した場合は `public/og/og-default.png` にフォールバックするが、記事ごとの専用画像を作るのが望ましい(SNSシェア時のプレビューに直結するため)。
5. `npm run build` → ローカルプレビューで確認 → コミット・push → `npx wrangler deploy`。

### OG画像の生成方法
新規npm依存を増やさず、ローカルのChromeヘッドレスでHTML→PNGを生成する方式を採用している(satoriやastro-og-canvas等は未導入)。
1. `/tmp`等の作業ディレクトリに、ブランドカラー(`bg-navy-950`グラデーション + `accent-500`のゴールド)でタイトルを配置したHTMLファイルを作成する。1200x630サイズ、"PH"バッジ+サイト名+記事タイトル+`ph.sotoyamacorp.com`の構成が基本形(既存の`public/og/*.png`を参考にする)。
2. 以下のコマンドでPNG化する:
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox \
     --window-size=1200,630 --hide-scrollbars --force-device-scale-factor=1 \
     --screenshot="出力先.png" "file:///作業ディレクトリ/対象.html"
   ```
3. 生成した画像を確認(Readツールで開いて視認)した上で `public/og/{slug}.png` に配置する。

### 過去にハマった落とし穴
- **色クラスは `src/styles/global.css` の `@theme` に定義されたトークンのみ使用可能**(navy: 50/100/200/600/700/800/900/950、accent: 50/100/500/600/700)。定義されていない濃淡(例: `navy-500`, `accent-800`)を指定すると何のCSSも生成されず、意図した色が当たらない「見えないバグ」になる。
- **本文・出典中にリンクを貼る場合は色とunderlineを明示すること**(例: `class="text-accent-700 underline hover:text-accent-500"`)。サイト共通のリセット(`a { color: inherit; text-decoration: inherit }`)により、クラス無指定だと地の文と同化して見えなくなる。外部サイトへのリンクは `target="_blank" rel="noopener noreferrer"` を付ける。
- **紺色背景(`bg-navy-950` / `bg-navy-900`)の上で使う見出し・テキストは白系の色クラス(`text-white` / `text-navy-200`)を明示すること**。見出し(h1〜h4)のデフォルト色は `@layer base` で定義されており、ユーティリティクラスで上書きされる前提になっている。
- **丸数字バッジ(`w-10 h-10 bg-accent-500 rounded-full`等)とテキストを横並びにする `flex` コンテナには、必ず `items-center` を付けること**。付け忘れるとバッジがテキストブロックの上寄りにズレて見える。テンプレート内の該当箇所(3つのポイントボックス・まとめステップボックス)はすべて `flex items-center gap-4` で統一済み。
- **記事(.mdx)のtitle/description/publishedAt/authorは、BaseLayout側で `Astro.props.frontmatter ?? Astro.props` として両対応済み**(MDXの`layout:`フロントマターは`Astro.props.frontmatter`にネストされる仕様のため)。`publishedAt`が存在する場合は自動でArticle構造化データ(JSON-LD)が出力される。BaseLayoutの props 受け取り方を変更する際は、この両対応ロジックを壊さないよう注意。

## ビルド・デプロイ
このプロジェクトは **pnpm** で管理されている(`pnpm-lock.yaml` / `pnpm-workspace.yaml` が存在)。**依存パッケージの追加・削除は必ず `pnpm add` / `pnpm remove` を使うこと**。`npm install` を実行すると、pnpmのシンボリックリンク構造のnode_modulesと衝突し、意味不明なエラー(`Cannot read properties of null`等)で失敗する。
```bash
pnpm install         # 依存関係インストール
pnpm add <package>    # パッケージ追加(npm installではなくこちらを使う)
npm run dev           # ローカル確認(スクリプト実行はnpm run/pnpm run どちらでも動く)
npm run build         # 本番ビルド
npx wrangler deploy    # デプロイ(Cloudflare Workers)
```

## SEO・多言語方針
- 記事ページはタイトル・description・OGP画像を必須項目とする。
- クラーク・パンパンガ・フィリピン進出などのキーワードを意識した構成にする。

## サイト内検索

2026-07-29にJioの依頼で導入。[Pagefind](https://pagefind.app/)を使用(静的サイト専用の検索ライブラリ、外部サービス契約不要、完全にブラウザ内で完結)。

### アーキテクチャ
- `package.json` の `build` スクリプトが `astro build && pagefind --site dist` になっており、**ビルドのたびに `dist/` 配下のHTMLを自動でインデックス化する**(新しい記事を追加しても、追加作業は不要)。
- `BaseLayout.astro` の `<main>` タグに `data-pagefind-body` を付与しており、この範囲内(記事本文等)のみがインデックス対象。ヘッダー・フッターなどの共通UIはインデックスされない。
- 検索ページ: `src/pages/search.astro`(日本語)/ `src/pages/en/search.astro`(英語)。`src/components/PagefindSearch.astro` が実際の検索UI(Pagefindの `PagefindUI` ウィジェット)を描画する。
- 言語別インデックスは `<html lang>` を見てPagefindが自動的に分離するため、日本語ページでは日本語記事のみ、英語ページでは英語記事のみが検索対象になる(追加設定不要)。
- ヘッダーに検索アイコン(虫眼鏡)を設置し、`/search`(または `/en/search`)へリンクしている。

### 注意事項
- **`npm run dev` のローカル開発サーバーでは検索は動作しない**(Pagefindは `dist/pagefind/` の生成物を読むため、`npm run build` を実行した後、`npm run preview` で確認する必要がある)。
- 日本語は語幹処理(stemming)が非対応という制約がPagefind側にある(例: 「進出」と「進出する」を別語として扱う)。検索自体は動作するが、日本語の表記ゆれに弱い点は今後の課題として認識しておく。

## 多言語対応(i18n)

2026-07-28にJioの依頼で導入。読者はフィリピン人にもこの取り組みを理解してもらえるよう、手動で言語切替できる構成にしている。

### アーキテクチャ
- Astro標準の `i18n` ルーティング(`astro.config.mjs`)を使用。`locales: ['ja', 'en']`、`defaultLocale: 'ja'`、`prefixDefaultLocale: false`。
- **日本語はプレフィックスなし**(`/`, `/about` など、既存URLのまま変更なし)。**英語は `/en/` 配下**(`/en/`, `/en/about` など)。日本語ページのURLは一切変えていない(SEO上の既存評価を壊さないため)。
- `src/lib/i18n.ts`: ロケール型定義・UI文字列辞書(`ui.ja` / `ui.en`)・ロケール判定(`getLangFromUrl`)・言語切替リンク生成(`getAlternatePath`)・ロケール別パス生成(`localizedPath`)を集約。
- `src/lib/site-config.ts`: `siteConfig`(ロケール非依存の固定値)と `siteText`(ロケール別のサイト名・タグライン・説明文)を分離。`founders` の `role` / `bio` も `Record<Locale, string>` 化。
- `src/lib/articles.ts`: 記事データは `translations.ja` / `translations.en` にタイトル・description・タグを持つ。`region`/`category`/`publishedAt`/`slug` はロケール非依存。`regionLabels` / `categoryLabels` もロケール別。
- `BaseLayout.astro` が `Astro.url` からロケールを判定し、`<html lang>`・hreflang代替リンク(ja/en/x-default)・OGP・構造化データ(Organization/Article)をすべてロケール別に出力する。
- `ArticleCard.astro` / `ArticleFilterTabs.astro` は `locale` propを必須で受け取る。ページ側で呼び出す際は必ず指定すること。
- `Header.astro` に言語切り替えリンクを設置。現在のパスに対応するもう一方のロケールのパスへ遷移する(`getAlternatePath`で計算。単に `/en/` に飛ばすのではなく、記事ページなら英語版の同じ記事に飛ぶ)。

### 新規ページ・コンポーネントを追加するときの注意
- ページ文言をハードコードする場合、`src/pages/{page}.astro`(日本語)と `src/pages/en/{page}.astro`(英語)の両方を作成する。
- 記事は直訳ではなく、**フィリピン人の読者が自然に読める英語**で書く(日本語→英語の逐語訳にしない。文の構造から書き直す)。数値・固有名詞・出典URLなどのファクトは正確に保つこと。
- 新しいUI文字列(ボタン名等)は `src/lib/i18n.ts` の `ui` に追加し、ページ固有の長文コンテンツ(見出し・本文)は各ページファイルに直接ロケール別に書く(サイト全体の巨大な辞書ファイルは作らない、既存パターンを踏襲)。

## メール配信(ニュースレター)

2026-07-28にJioの依頼で導入。読者がメール購読でき、新着記事を公開すると通知メールが届く仕組み。

### アーキテクチャ・現状(2026-07-28時点)
- **購読フォーム**: `src/components/NewsletterSignup.astro`。[Buttondown](https://buttondown.com/)(ユーザー名 `jio`)の無料プランに接続済み・本番稼働中。トップページと記事一覧ページ(日英とも)に設置。購読者収集は無料プランの範囲内。
- **RSSフィード**: `src/pages/rss.xml.js`(日本語)/ `src/pages/en/rss.xml.js`(英語)。`@astrojs/rss` を使用し、`src/lib/articles.ts` の `sortedArticles` から自動生成される。記事を配列に追加してビルド・デプロイすれば自動更新される。
- **配信方式は「手動送信」**: ButtondownのRSS→メール自動配信機能(RSS-to-email)は有料プラン(Basic、月$9)限定であることが判明(2026-07-28確認)。MailerLiteなど他の主要サービスも同様にRSS自動配信は有料機能だったため、**無料プランのまま・手動送信で運用する方針**にした(Jio判断)。自動配信への切り替えを検討する場合は、まずJioに費用対効果を確認すること。

### 記事公開時の運用手順(デイリータスク内で実施)
新しい記事を公開したら、X投稿文と合わせて**通知メールの文面(件名+本文)もドラフトする**。
1. `content-style.md`のトーンに沿って、件名(記事タイトルを踏まえた簡潔なもの)と本文(記事の要点+記事へのリンク)を作成する。日本語記事なら日本語で、英語記事も出した場合は英語版も用意する。
2. JioがButtondown管理画面(https://buttondown.com/emails ）の「Compose」から、ドラフトした文面を貼り付けて手動送信する。
3. 送信自体はJioが行うため、Claudeは文面のドラフトまで(X投稿文と同じ運用)。

## AIチャットボット

2026-07-29にJioの依頼で導入。サイト右下に浮かぶチャットウィジェットから、記事内容をもとにAIが質問に答える。

### アーキテクチャ
- これまでこのサイトは「静的アセットのみのCloudflare Worker」(`wrangler.jsonc`に`main`なし)だったが、チャットAPIを持たせるため`worker/index.ts`をWorkerのエントリーポイントに設定し、`/api/chat`・`/api/chat-lead`・`/admin/chat-logs`以外のリクエストは`env.ASSETS.fetch(request)`で従来どおり`dist/`の静的配信にフォールバックする構成にした。
- **重要な落とし穴**: `assets.not_found_handling: "404-page"`が設定されていると、静的ファイルにマッチしないGETリクエストはデフォルトでAssetsレイヤーが直接`dist/404.html`を返してしまい、**Workerの`fetch`ハンドラーに一切到達しない**(2026-07-29に`/admin/chat-logs`が常に404になる不具合で発覚)。これを避けるため`wrangler.jsonc`の`assets`に`"run_worker_first": ["/api/*", "/admin/*"]`を追加し、これらのパスは必ずWorkerのコードを先に実行するようにしている。今後`/api/`や`/admin/`以外の新しいWorkerルートを追加する場合も、このパターン(`run_worker_first`への追加)を忘れないこと。
- **AIモデル**: [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/)の`@cf/meta/llama-3.3-70b-instruct-fp8-fast`を使用(`wrangler.jsonc`の`ai.binding: "AI"`)。外部サービスの契約・課金設定不要で、無料枠の範囲内で運用できる想定(超過時も従量課金で非常に安価)。日本語の応答品質に不満が出た場合はAnthropic APIへの切り替えを検討する(その場合は別途APIキー・課金設定が必要)。
- **回答の根拠(簡易RAG)**: `scripts/build-chat-corpus.mjs`が`npm run build`のたびに`src/pages/articles/*.mdx`・`src/pages/en/articles/*.mdx`からフロントマターと本文プレーンテキストを抽出し、`public/chat-corpus.json`を生成する(記事を追加すればビルド・デプロイのたびに自動反映される、追加作業不要)。`worker/index.ts`はユーザーの質問文とこのJSONを2文字bigramの一致数で簡易スコアリングし、関連度の高い記事だけをプロンプトに含める(形態素解析ライブラリは導入していない割り切った実装)。関連記事がない場合はAIが「わからない」旨を正直に伝え、`/articles`や`/contact`への導線を案内するようプロンプトで指示している。
- `public/chat-corpus.json`はビルド生成物のため`.gitignore`対象(コミットしない)。
- **フロントエンド**: `src/components/ChatWidget.astro`。`BaseLayout.astro`から全ページ共通で読み込まれる(サイト全体に表示)。ロケール(ja/en)は`locale` propで受け取り、質問・回答・UI文言ともに自動で切り替わる。

### メールアドレスのゲートとリード管理
- チャットを使う前にメールアドレスの入力を必須にしている。入力されたメールは`/api/chat-lead`経由でButtondownの購読者リストに登録される(ニュースレター購読者と同じリスト)。JioはいつものButtondown管理画面(https://buttondown.com/emails )でそのまま確認できる。
- **タグではなくnotesフィールドで区別している**(2026-07-29判明: Buttondownの`tags`機能は無料プランでは使えず、Basic以上の有料プラン限定だった)。そのため`notes: "chatbot-lead"`を購読者の備考として記録する方式にした。購読者詳細を開けばメモ欄で判別できる。将来Basicプラン以上にアップグレードした場合は、`worker/index.ts`の`handleChatLead`で`notes`を`tags: ['chatbot-lead']`に戻すとタグでの絞り込みができるようになる。
- **`X-Buttondown-Bypass-Firewall: true`ヘッダーが必須**(2026-07-29判明): Cloudflare Workersの共有送信元IPからのリクエストは、Buttondown側のスパム対策firewallに疑わしいと判定されデフォルトでブロックされる(`subscriber_blocked`エラー)。自前の認証済みサーバーサイド統合であることを示すこのヘッダーを付けてバイパスする(Buttondown公式ドキュメント推奨の対処法)。このヘッダーを外すと購読者登録が全滅するので注意。
- Buttondown側は新規購読者にデフォルトでダブルオプトイン(確認メール)が送られる仕様のため、ゲート画面にはその旨を示すメッセージを表示している(サイレントに購読させることはしない)。
- **`BUTTONDOWN_API_KEY`をCloudflareのシークレットとして登録する必要がある**(https://buttondown.com/settings/api でAPIキーを発行し、`npx wrangler secret put BUTTONDOWN_API_KEY`を実行してJio自身が値を貼り付ける。Claudeがこのキーの値を扱うことはない)。未設定の場合でもチャット自体は動作するが、リードのButtondown登録だけがスキップされる(`worker/index.ts`の`handleChatLead`参照)。

### 質問ログの記録・確認

2026-07-29にJioの依頼で導入。読者がチャットに送った質問と回答を記録し、後から確認できるようにしている。

- **保存先**: Cloudflare D1(`clark-chat-logs`、`wrangler.jsonc`の`d1_databases`で`DB`としてバインド)。`worker/schema.sql`にテーブル定義(`chat_logs`: `created_at` / `locale` / `email` / `question` / `answer`)がある。新しいD1インスタンスを作り直す場合は`npx wrangler d1 execute clark-chat-logs --remote --file=worker/schema.sql`で流し込む。
- `worker/index.ts`の`handleChat`が、AIの応答生成後に`ctx.waitUntil()`で非同期にログを書き込む(レスポンス速度に影響しない)。書き込み失敗時もチャット応答自体は止めない設計。
- メールアドレスは`ChatWidget.astro`がlocalStorageに保存済みのもの(ゲート突破時に入力されたもの)を`/api/chat`のリクエストに一緒に送っている。ゲート前の状態ではchat自体が使えないため、通常は必ず紐づく。
- **確認方法**: `https://ph.sotoyamacorp.com/admin/chat-logs?key=<ADMIN_KEY>` にアクセスすると、新しい順に最大200件を一覧表示する(日時・言語・メール・質問・回答)。`ADMIN_KEY`はCloudflareのシークレットとして登録済み(`wrangler secret put ADMIN_KEY`)。このURLは`noindex`だが、検索エンジンや第三者に知られないよう、リンクを公開の場に貼らないこと。キーを再発行したい場合は`wrangler secret put ADMIN_KEY`で上書きする。
- このページは`src/pages/`のAstro静的ページではなく、`worker/index.ts`内で動的にHTMLを生成して返している(D1への都度クエリが必要なため、ビルド時に静的生成する通常のページとは扱いが異なる)。

### 型定義の再生成
`wrangler.jsonc`のbindings(`ai`・`assets.binding`・`d1_databases`)を変更した場合は`npx wrangler types`を再実行し、`worker-configuration.d.ts`(`Env`型の定義、`.gitignore`対象・再生成物)を更新すること。

### 既知の制約
- `astro dev`のローカル開発サーバーではWorkerが起動しないため、チャットAPIは動作しない(Pagefind検索と同じ制約)。動作確認は`npm run build && npx wrangler dev`で行うこと。
- 関連記事の検索はbigram一致による簡易スコアリングのため、表記ゆれ(送り仮名の違い等)には弱い。回答品質に問題が出るようであれば、しきい値(`worker/index.ts`の`score >= 3`)やTOP_K件数の調整、将来的には形態素解析・Embeddingベースの検索への切り替えを検討する。

## モバイル幅の検証方法(重要な落とし穴)

2026-07-29に発覚。**Chromeヘッドレスの `--window-size` フラグは、この開発環境では500px未満を指定しても実際のビューポート幅が500pxに固定される**(ウィンドウサイズの下限がある模様)。この状態でスクリーンショットを撮ると、実際は500px幅でレイアウトされた内容の一部が単に画面外に切れて見えなくなるだけなのに、あたかも要素が消失・崩壊しているかのような誤った検証結果になる(500px未満を検証しているつもりが、実際は500px固定でレイアウトされたものの一部を見ているだけ、という罠)。

**500px未満(実際のスマホ幅: 320〜430px程度)を正確に検証する場合は、Chrome DevTools Protocol (CDP) を直接使い、`Emulation.setDeviceMetricsOverride` でビューポートを明示的に指定すること。** 手順:
```bash
# 1. リモートデバッグ有効でChromeを起動(origin許可が必須)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox \
  --remote-debugging-port=9222 "--remote-allow-origins=*" about:blank &

# 2. websocket-client, requests をpython3にインストール(未導入の場合)
pip3 install --quiet websocket-client requests

# 3. CDP経由でPage.navigate → Emulation.setDeviceMetricsOverride(width/height/mobile:true) →
#    Page.captureScreenshot を実行するPythonスクリプトでスクリーンショットを撮る
#    (このセッションで作成したスクリプト例は使い捨てのスクラッチパッドに保存済み。
#    同様のスクリプトを都度書けばよい)
```
`--window-size` だけで手軽に確認したくなるが、**500px未満のモバイル最適化を検証する際は必ずCDP経由の方法を使うこと**。そうしないと存在しないバグを追いかけて時間を浪費する(実際に2026-07-29のヘッダー幅対応作業で、この罠により誤ったデバッグを長時間行ってしまった)。

## 注意事項
- サイトのコンテンツ(文体・トーン)は `../.claude/rules/content-style.md` に従う。
- 事業の背景情報が必要な場合は `../CLAUDE.md` と `../.claude/rules/business-context.md` を参照。
