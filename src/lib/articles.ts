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
  ja: { history: '歴史', incentives: '税制優遇' },
  en: { history: 'History', incentives: 'Tax Incentives' },
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
];

export const sortedArticles = [...articles].sort(
  (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
);
