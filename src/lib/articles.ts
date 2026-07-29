import type { Locale } from './i18n';

// 記事が扱う地理的スコープ。「クラーク特化」と「フィリピン全体」の
// 2軸で読者がコンテンツを選べるようにするための分類。
export type ArticleRegion = 'clark' | 'philippines';

export const regionLabels: Record<Locale, Record<ArticleRegion, string>> = {
  ja: { clark: 'クラーク', philippines: 'フィリピン全体' },
  en: { clark: 'Clark', philippines: 'Philippines-wide' },
};

// 地域バッジの配色。クラーク=紺(サイトの基調色)、フィリピン全体=ゴールド(アクセント色)で
// 一目で見分けられるようにする。使用可能なトークンは src/styles/global.css の @theme を参照。
export const regionBadgeStyles: Record<ArticleRegion, string> = {
  clark: 'bg-navy-950 text-accent-500',
  philippines: 'bg-accent-700 text-white',
};

// category は内部的な分類キー。表示用ラベルはここで locale ごとに定義する。
export const categoryLabels: Record<Locale, Record<string, string>> = {
  ja: { history: '歴史', incentives: '税制優遇', policy: '政策・規制', infrastructure: 'インフラ', labor: '労働政策', economy: '経済', 'real-estate': '不動産', investment: '投資' },
  en: { history: 'History', incentives: 'Tax Incentives', policy: 'Policy', infrastructure: 'Infrastructure', labor: 'Labor Policy', economy: 'Economy', 'real-estate': 'Real Estate', investment: 'Investment' },
};

export interface ArticleTranslation {
  title: string;
  description: string;
  tags: string[];
}

export interface Article {
  slug: string;
  publishedAt: Date;
  category: string;
  region: ArticleRegion;
  translations: Record<Locale, ArticleTranslation>;
}

// 記事データを手動定義（将来的には外部ファイルから読み込み）
export const articles: Article[] = [
  {
    slug: 'clark-history-and-value',
    publishedAt: new Date('2026-07-28'),
    category: 'history',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク進出を考える日本企業へ：歴史から見た今の価値と注目ポイント',
        description:
          'フィリピン・クラーク進出を検討する日本企業向けに、クラークの歴史、現在の注目点、進出前に押さえたいポイントをわかりやすく解説します。',
        tags: ['クラーク進出', 'フィリピン', '日本企業進出', '進出前のポイント'],
      },
      en: {
        title: 'Why Clark Matters for Japanese Companies: Its History and Value Today',
        description:
          'A practical look at Clark’s history for Japanese companies weighing an expansion, plus what to check before committing.',
        tags: ['Clark expansion', 'Philippines', 'Japanese companies', 'Pre-expansion checklist'],
      },
    },
  },
  {
    slug: 'clark-create-more-tax-incentives',
    publishedAt: new Date('2026-07-28T12:00:00'),
    category: 'incentives',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク進出の税制優遇「CREATE MORE法」を徹底解説：CDC登録企業が受けられる恩恵と注意点',
        description:
          '2024年施行のCREATE MORE法(RA 12066)で税制優遇はどう変わったか。クラーク進出企業が実際に受けられる恩恵と、PEZAとの違い・注意点を解説します。',
        tags: ['CREATE MORE法', 'PEZA', 'CDC', '税制優遇', 'クラーク進出'],
      },
      en: {
        title: 'The CREATE MORE Act Explained: Tax Incentives for Companies Registered with CDC in Clark',
        description:
          'What changed under the 2024 CREATE MORE Act (RA 12066), and what benefits and pitfalls Clark-based companies should know about, including the difference from PEZA.',
        tags: ['CREATE MORE Act', 'PEZA', 'CDC', 'Tax incentives', 'Clark expansion'],
      },
    },
  },
  {
    slug: 'philippines-foreign-investment-negative-list-2026',
    publishedAt: new Date('2026-07-29'),
    category: 'policy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピンの外資規制が緩和：第13次ネガティブリスト(EO113)を日本企業向けに解説',
        description:
          '2026年4月署名・5月施行の大統領令113号(第13次外国投資ネガティブリスト)で何が変わったか。小売業の外資規制緩和を中心に、日本企業への影響を解説します。',
        tags: ['外資規制', 'ネガティブリスト', 'EO113', '小売業', 'フィリピン進出'],
      },
      en: {
        title: 'The Philippines Eases Foreign Ownership Rules: What EO 113 Means for Japanese Companies',
        description:
          'What changed under Executive Order 113 (the 13th Foreign Investment Negative List), signed in April 2026 and effective in May 2026 — with a focus on retail and what it means for Japanese companies.',
        tags: ['Foreign ownership rules', 'Negative List', 'EO 113', 'Retail trade', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-luzon-economic-corridor',
    publishedAt: new Date('2026-07-29T12:00:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'ルソン経済回廊とクラーク：日米比連携の最新動向とビジネス機会',
        description:
          '日米比が推進する「ルソン経済回廊」でクラークはどう位置づけられるか。2026年の連携拡大やインフラ計画の最新動向と、日本企業にとっての意味を解説します。',
        tags: ['ルソン経済回廊', '日米比連携', 'インフラ投資', 'クラーク進出', 'サブオク・クラーク鉄道'],
      },
      en: {
        title: 'The Luzon Economic Corridor and Clark: What Japan-US-Philippines Cooperation Means for Business',
        description:
          'How does Clark fit into the Luzon Economic Corridor driven by Japan, the US, and the Philippines? A look at the 2026 partnership expansion, infrastructure plans, and what it means for Japanese companies.',
        tags: ['Luzon Economic Corridor', 'Japan-US-Philippines cooperation', 'Infrastructure investment', 'Clark expansion', 'Subic-Clark railway'],
      },
    },
  },
  {
    slug: 'manila-ncr-minimum-wage-2026',
    publishedAt: new Date('2026-07-29T18:00:00'),
    category: 'labor',
    region: 'philippines',
    translations: {
      ja: {
        title: 'マニラ首都圏の最低賃金が2段階で85ペソ引き上げ：日本企業の人件費計画への影響',
        description:
          '2026年7月25日施行のNCR賃金命令27号で最低賃金が段階的に引き上げ。具体的な金額と、日本企業の人件費計画に与える影響を解説します。',
        tags: ['最低賃金', 'NCR賃金命令27号', '人件費', '労働政策', 'フィリピン進出'],
      },
      en: {
        title: "Metro Manila's Minimum Wage Rises ₱85 in Two Stages: What It Means for Labor Cost Planning",
        description:
          "Wage Order NCR-27, effective July 25, 2026, raises the minimum wage in two stages. Here's the exact numbers and what it means for Japanese companies' labor cost planning.",
        tags: ['Minimum wage', 'NCR Wage Order 27', 'Labor costs', 'Labor policy', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-pax-silica-ai-hub',
    publishedAt: new Date('2026-07-29T19:00:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラークに1,618ヘクタールのAIハブ構想「Pax Silica」始動：フォックスコンが投資、日本企業への影響は',
        description:
          '米国主導の半導体・AI供給網構想「Pax Silica」で、ニュークラークシティが1,618ヘクタールのAI産業ハブに。台湾フォックスコンが主要投資家として参画する計画の最新動向を解説します。',
        tags: ['Pax Silica', 'AIハブ', 'ニュークラークシティ', '半導体', 'フォックスコン'],
      },
      en: {
        title: "A 1,618-Hectare AI Hub Takes Shape Near Clark Under 'Pax Silica': Foxconn Investing, What It Means for Japanese Companies",
        description:
          "Under the US-led semiconductor and AI supply chain initiative 'Pax Silica,' New Clark City is set to become a 1,618-hectare AI industrial hub, with Taiwan's Foxconn as anchor investor. Here's the latest.",
        tags: ['Pax Silica', 'AI hub', 'New Clark City', 'Semiconductors', 'Foxconn'],
      },
    },
  },
  {
    slug: 'philippines-e-invoicing-bir-eis-2026',
    publishedAt: new Date('2026-07-29T22:00:00'),
    category: 'policy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'BIR電子インボイス義務化(EIS)が2026年末に完了：日本企業が今から準備すべきこと',
        description:
          'フィリピン国税庁(BIR)の電子インボイスシステム(EIS)義務化の対応期限が2026年12月31日に延長。対象企業・技術要件・準備すべきことを解説します。',
        tags: ['電子インボイス', 'EIS', 'BIR', '税務コンプライアンス', 'フィリピン進出'],
      },
      en: {
        title: "BIR's E-Invoicing Mandate (EIS) Takes Full Effect by End of 2026: What Japanese Companies Should Prepare Now",
        description:
          "The compliance deadline for the Philippines' Bureau of Internal Revenue e-invoicing system (EIS) has been extended to December 31, 2026. Here's who's covered, the technical requirements, and what to prepare.",
        tags: ['E-invoicing', 'EIS', 'BIR', 'Tax compliance', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-airport-second-runway-expansion',
    publishedAt: new Date('2026-07-29T23:00:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク国際空港に第2滑走路計画：2029年運用開始目指し設計契約締結、旅客数は15%増の見通し',
        description:
          'BCDAがクラーク国際空港の第2滑走路詳細設計契約を締結。2029年第4四半期の運用開始を目指す計画と、2026年の旅客数15%増予測、新規就航路線の動向を解説します。',
        tags: ['クラーク国際空港', '第2滑走路', 'BCDA', '航空路線', '物流ハブ'],
      },
      en: {
        title: 'Clark International Airport Plans a Second Runway: Design Contract Signed, Targeting 2029, Passenger Traffic Up 15%',
        description:
          "BCDA has awarded the detailed design contract for Clark International Airport's second runway, targeting operation by Q4 2029. Here's the plan, the 2026 passenger growth forecast, and new route developments.",
        tags: ['Clark International Airport', 'Second runway', 'BCDA', 'Air routes', 'Logistics hub'],
      },
    },
  },
  {
    slug: 'philippines-japan-tokyo-investment-roundtable-2026',
    publishedAt: new Date('2026-07-29T20:00:00'),
    category: 'investment',
    region: 'philippines',
    translations: {
      ja: {
        title: 'マルコス大統領、東京で日本企業から34億ドルの投資公約獲得：進出検討企業への示唆',
        description:
          '2026年5月27日、東京の帝国ホテルで開催されたビジネス円卓会議で、フィリピンは日本企業から34億ドル(約210億ペソ)の投資公約を獲得。三菱商事・トヨタ等が参加した会合の内容を解説します。',
        tags: ['日比投資', '東京ビジネス円卓会議', 'マルコス大統領', '対日投資誘致', 'フィリピン進出'],
      },
      en: {
        title: 'President Marcos Secures $3.4B in Investment Pledges from Japanese Firms in Tokyo',
        description:
          "At a business roundtable at Tokyo's Imperial Hotel on May 27, 2026, the Philippines secured $3.4 billion (roughly ₱210 billion) in investment pledges from Japanese companies including Mitsubishi Corp. and Toyota. Here's what it involved.",
        tags: ['Japan-Philippines investment', 'Tokyo Business Roundtable', 'President Marcos', 'Foreign investment', 'Philippines expansion'],
      },
    },
  },
];

export const sortedArticles = [...articles].sort(
  (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
);
