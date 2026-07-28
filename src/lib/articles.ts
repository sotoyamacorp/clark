import type { Locale } from './i18n';

// 記事が扱う地理的スコープ。「クラーク特化」と「フィリピン全体」の
// 2軸で読者がコンテンツを選べるようにするための分類。
export type ArticleRegion = 'clark' | 'philippines';

export const regionLabels: Record<Locale, Record<ArticleRegion, string>> = {
  ja: { clark: 'クラーク', philippines: 'フィリピン全体' },
  en: { clark: 'Clark', philippines: 'Philippines-wide' },
};

// category は内部的な分類キー。表示用ラベルはここで locale ごとに定義する。
export const categoryLabels: Record<Locale, Record<string, string>> = {
  ja: { history: '歴史', incentives: '税制優遇', policy: '政策・規制', infrastructure: 'インフラ' },
  en: { history: 'History', incentives: 'Tax Incentives', policy: 'Policy', infrastructure: 'Infrastructure' },
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
];

export const sortedArticles = [...articles].sort(
  (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
);
