export interface Article {
  slug: string;
  title: string;
  description: string;
  publishedAt: Date;
  category: string;
  tags: string[];
}

// 記事データを手動定義（将来的には外部ファイルから読み込み）
export const articles: Article[] = [
  {
    slug: 'clark-history-and-value',
    title: 'クラーク進出を考える日本企業へ：歴史から見た今の価値と注目ポイント',
    description: 'フィリピン・クラーク進出を検討する日本企業向けに、クラークの歴史、現在の注目点、進出前に押さえたいポイントをわかりやすく解説します。',
    publishedAt: new Date('2026-07-28'),
    category: 'history',
    tags: ['クラーク進出', 'フィリピン', '日本企業進出', '進出前のポイント'],
  },
];

export const sortedArticles = [...articles].sort(
  (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
);
