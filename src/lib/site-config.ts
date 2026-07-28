// サイト全体で使う固定情報の単一の入口。
// ここにない文言をコンポーネント側にハードコードしないこと。
// 数値データ（給与・賃料など）は Phase 2 で src/data/*.yaml に分離する。

import type { Locale } from './i18n';

// ロケールに依存しない固定情報
export const siteConfig = {
  url: 'https://ph.sotoyamacorp.com',
  gaMeasurementId: 'G-GE6054G80X',
  contactEmail: 'jio@sotoyamacorp.com',
  twitterUrl: 'https://x.com/sotoyamafam',
  // TODO: Tally フォームのURLを発行後に差し替える
  tallyFormUrl: '',
} as const;

// ロケールごとのサイト名・タグライン・説明文
export const siteText: Record<Locale, { name: string; tagline: string; description: string }> = {
  ja: {
    name: 'フィリピン・クラーク通信',
    tagline: 'フィリピン・クラークのありとあらゆる情報まとめ',
    description: 'ビジネス・生活・制度など、あらゆる情報を出典付きでわかりやすく届けるメディアです。',
  },
  en: {
    name: 'PH Clark Times',
    tagline: 'Everything about the Philippines and Clark, in one place',
    description:
      'Business, lifestyle, and policy updates on the Philippines and Clark, backed by clear sources.',
  },
};

export interface FounderProfile {
  id: 'geanoff';
  name: string;
  role: Record<Locale, string>;
  photo?: string;
  bio: Record<Locale, string>;
  // false の場合、公開ページには表示しない（データとしては残す）
  published: boolean;
}

export const founders: FounderProfile[] = [
  {
    id: 'geanoff',
    name: 'ジーノフ',
    role: { ja: '運営者', en: 'Founder' },
    bio: {
      ja: 'フィリピンパンパンガ出身の日本育ち。フィリピン、クラークに進出したい日本の企業様に向けて情報発信。',
      en: 'Born in Pampanga, Philippines, and raised in Japan. Sharing practical information for Japanese companies looking to expand into Clark, Philippines.',
    },
    published: true,
  },
];
