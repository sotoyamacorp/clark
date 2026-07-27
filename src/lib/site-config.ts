// サイト全体で使う固定情報の単一の入口。
// ここにない文言をコンポーネント側にハードコードしないこと。
// 数値データ（給与・賃料など）は Phase 2 で src/data/*.yaml に分離する。

export const siteConfig = {
  name: 'クラーク進出ガイド',
  tagline: 'フィリピン・クラーク進出の一次情報データベース',
  description:
    '日本の中小企業がフィリピン・クラークへ進出する際に必要な、給与・賃料・制度・現地の実情を一次情報で伝えるデータベースです。',
  url: 'https://ph.sotoyamacorp.com',
  // ルートドメイン（sotoyamacorp.com）のGoogle Workspaceで受信する想定。
  // TODO: 実際に使うアドレスに差し替える
  contactEmail: 'contact@sotoyamacorp.com',
  // TODO: Tally フォームのURLを発行後に差し替える
  tallyFormUrl: '',
  locale: 'ja-JP',
} as const;

export interface FounderProfile {
  id: 'jio' | 'hiro';
  name: string;
  role: string;
  photo?: string;
  bio: string;
}

// TODO: プレースホルダー。実際の経歴・写真に差し替える（Phase 1では構造のみ）
export const founders: FounderProfile[] = [
  {
    id: 'jio',
    name: 'Jio（仮）',
    role: '共同代表',
    bio: 'ここに経歴のプレースホルダーテキストが入ります。日本側での事業経験や、クラーク進出プロジェクトに関わることになった経緯を記載してください。',
  },
  {
    id: 'hiro',
    name: 'Hiro（仮）',
    role: '共同代表',
    bio: 'ここに経歴のプレースホルダーテキストが入ります。フィリピン・クラーク現地での活動歴や、現地パートナーとの関係性を記載してください。',
  },
];
