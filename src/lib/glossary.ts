// 記事本文に出てくる略語をクリックで簡潔に説明するための用語集。
// GlossaryTerms.astro が本文からこれらの語(前方一致は不可、単語境界での完全一致のみ)を
// 検出し、各語の最初の出現箇所だけをクリック可能にする(本文を読みづらくしないため)。
//
// 【運用ルール】新しい記事で新しい略語・専門用語が登場したら、その都度この配列に
// エントリーを追加すること(/glossary ・ /en/glossary ページと本文中のクリック可能な
// 用語表示は、この配列を唯一のデータソースとして自動的に反映される)。
import type { Locale } from './i18n';

export interface GlossaryEntry {
  term: string;
  ja: string;
  en: string;
}

export const glossary: GlossaryEntry[] = [
  {
    term: 'CDC',
    ja: 'クラーク開発公社(Clark Development Corporation)。クラーク・フリーポート・ゾーンの開発・運営・企業誘致を担う政府系機関。',
    en: 'Clark Development Corporation — the government agency that develops, operates, and promotes investment into Clark Freeport Zone.',
  },
  {
    term: 'PEZA',
    ja: 'フィリピン経済区庁(Philippine Economic Zone Authority)。輸出志向の経済特区(エコゾーン)を管轄する投資誘致機関。日本企業が最も多く利用するIPA。',
    en: 'Philippine Economic Zone Authority — the agency overseeing export-oriented special economic zones. The investment promotion agency most commonly used by Japanese companies.',
  },
  {
    term: 'BSP',
    ja: 'Bangko Sentral ng Pilipinas。フィリピンの中央銀行で、日本銀行に相当。金融政策・物価安定・銀行監督のほか、FDIなどの対外部門統計も公表する。',
    en: 'Bangko Sentral ng Pilipinas, the Philippine central bank (equivalent to the Bank of Japan). Handles monetary policy, price stability, bank supervision, and publishes external-sector statistics including FDI data.',
  },
  {
    term: 'BIR',
    ja: 'フィリピン国税庁(Bureau of Internal Revenue)。国税の賦課・徴収を担当する、日本の国税庁に相当する機関。',
    en: 'Bureau of Internal Revenue — the Philippine tax authority responsible for assessing and collecting national taxes (equivalent to Japan\'s National Tax Agency).',
  },
  {
    term: 'FDI',
    ja: '対内直接投資(Foreign Direct Investment)。海外投資家がフィリピン国内企業に出資・貸付する形で実際に動いた資金を指す。',
    en: 'Foreign Direct Investment — capital that foreign investors actually put into local companies via equity or debt.',
  },
  {
    term: 'ITH',
    ja: '法人所得税免除(Income Tax Holiday)。PEZA・CDCなど登録企業が一定期間、法人所得税の納付を免除される優遇制度。',
    en: 'Income Tax Holiday — a set period during which registered enterprises (e.g. under PEZA or CDC) are exempt from paying corporate income tax.',
  },
  {
    term: 'VAT',
    ja: '付加価値税(Value Added Tax)。日本の消費税に相当。登録企業は適格な仕入れについてゼロ税率が適用される場合がある。',
    en: "Value Added Tax (similar to Japan's consumption tax). Registered enterprises may qualify for zero-rating on eligible purchases.",
  },
  {
    term: 'MICE',
    ja: '会議(Meetings)・研修旅行(Incentives)・国際会議(Conventions)・展示会(Exhibitions)の頭文字。企業の会議・研修需要を取り込む観光分野を指す。',
    en: 'Meetings, Incentives, Conferences, and Exhibitions — the segment of tourism built around corporate meeting, training, and event demand.',
  },
  {
    term: 'IPA',
    ja: '投資誘致機関(Investment Promotion Agency)。PEZA・CDC・BOIなど、企業の登録・税制優遇を管轄する機関の総称。',
    en: 'Investment Promotion Agency — the general term for bodies like PEZA, CDC, and BOI that register companies and administer investment incentives.',
  },
  {
    term: 'EIS',
    ja: '電子インボイスシステム(Electronic Invoicing System)。BIRが導入を進める電子インボイス・電子帳簿の義務化制度。',
    en: "Electronic Invoicing System — BIR's mandatory e-invoicing and electronic bookkeeping system.",
  },
  {
    term: 'BCDA',
    ja: '基地転換開発庁(Bases Conversion and Development Authority)。旧米軍基地の再開発を担う政府機関で、CDCの上部組織。',
    en: 'Bases Conversion and Development Authority — the government body overseeing redevelopment of former U.S. military bases, and CDC\'s parent organization.',
  },
  {
    term: 'ASEAN',
    ja: '東南アジア諸国連合(Association of Southeast Asian Nations)。フィリピンを含む東南アジア10カ国の地域協力機構。',
    en: 'Association of Southeast Asian Nations — the regional bloc of 10 Southeast Asian countries, including the Philippines.',
  },
  {
    term: 'NCR',
    ja: '首都圏(National Capital Region)。マニラ首都圏を指すフィリピンの行政区分。',
    en: 'National Capital Region — the official designation for Metro Manila.',
  },
  {
    term: 'GDP',
    ja: '国内総生産(Gross Domestic Product)。一定期間に国内で生み出された付加価値の合計で、経済成長率の代表的な指標。',
    en: 'Gross Domestic Product — the total value added produced within a country over a given period, the standard measure of economic growth.',
  },
  {
    term: 'SEIPI',
    ja: 'フィリピン半導体・電子工業会(Semiconductor and Electronics Industries in the Philippines Foundation)。業界団体として輸出統計等を公表している。',
    en: 'Semiconductor and Electronics Industries in the Philippines Foundation — the industry association that publishes sector export data.',
  },
  {
    term: 'RBE',
    ja: '登録事業体(Registered Business Enterprise)。PEZAやCDCなどのIPAに登録し、税制優遇を受ける企業を指す。',
    en: 'Registered Business Enterprise — a company registered with an IPA (such as PEZA or CDC) that receives investment incentives.',
  },
  {
    term: 'SBMA',
    ja: 'スービック湾首都圏公社(Subic Bay Metropolitan Authority)。スービック湾経済特区を管轄する、CDCと並ぶ独立機関。',
    en: 'Subic Bay Metropolitan Authority — the independent body governing the Subic Bay Freeport Zone, analogous to CDC for Clark.',
  },
  {
    term: 'BOI',
    ja: '投資委員会(Board of Investments)。経済特区の外でフィリピン全土を対象に投資誘致・登録を行う政府機関。',
    en: 'Board of Investments — the government agency handling investment registration nationwide, outside of special economic zones.',
  },
  {
    term: 'IRR',
    ja: '実施細則(Implementing Rules and Regulations)。法律の具体的な運用方法を定めた下位規則。',
    en: 'Implementing Rules and Regulations — the detailed rules that govern how a law is actually applied.',
  },
  {
    term: 'CEZA',
    ja: 'カガヤン経済特区庁(Cagayan Economic Zone Authority)。フィリピン北部カガヤン州の経済特区を管轄する地域限定のIPA。',
    en: 'Cagayan Economic Zone Authority — a regional investment promotion agency covering the Cagayan special economic zone in northern Philippines.',
  },
  {
    term: 'ZCSEZA',
    ja: 'サンボアンガ経済特区庁(Zamboanga City Special Economic Zone Authority)。ミンダナオ島サンボアンガの経済特区を管轄する地域限定のIPA。',
    en: 'Zamboanga City Special Economic Zone Authority — a regional investment promotion agency covering the Zamboanga special economic zone in Mindanao.',
  },
];

// 用語集ページ(/glossary, /en/glossary)の「関連記事」表示用。
// 各記事の生ソース(frontmatter含む)を静的に読み込み、その語が本文中に
// 実際に出現する記事だけを関連記事として拾う(手動でのマッピング管理を不要にするため)。
const jaArticleSources = import.meta.glob('../pages/articles/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;
const enArticleSources = import.meta.glob('../pages/en/articles/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.replace(/^.*\//, '').replace(/\.mdx$/, '');
}

export function getRelatedSlugsForTerm(term: string, locale: Locale): string[] {
  const sources = locale === 'ja' ? jaArticleSources : enArticleSources;
  const regex = new RegExp('\\b' + term + 's?\\b');
  return Object.entries(sources)
    .filter(([, content]) => regex.test(content))
    .map(([path]) => slugFromPath(path));
}
