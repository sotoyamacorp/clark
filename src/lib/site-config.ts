// サイト全体で使う固定情報の単一の入口。
// ここにない文言をコンポーネント側にハードコードしないこと。
// 数値データ（給与・賃料など）は Phase 2 で src/data/*.yaml に分離する。

export const siteConfig = {
  name: 'フィリピン・クラーク通信',
  tagline: 'フィリピン・クラークのありとあらゆる情報まとめ',
  description: 'ビジネス・生活・制度など、あらゆる情報を出典付きでわかりやすく届けるメディアです。',
  url: 'https://ph.sotoyamacorp.com',
  gaMeasurementId: 'G-GE6054G80X',
  contactEmail: 'jio@sotoyamacorp.com',
  // TODO: Tally フォームのURLを発行後に差し替える
  tallyFormUrl: '',
  locale: 'ja-JP',
} as const;

export interface FounderProfile {
  id: 'geanoff';
  name: string;
  role: string;
  photo?: string;
  bio: string;
  // false の場合、公開ページには表示しない（データとしては残す）
  published: boolean;
}

export const founders: FounderProfile[] = [
  {
    id: 'geanoff',
    name: 'ジーノフ',
    role: '運営者',
    bio: 'フィリピンパンパンガ出身の日本育ち。フィリピン、クラークに進出したい日本の企業様に向けて情報発信。',
    published: true,
  },
];
