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
  buttondownUsername: 'jio',
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
      ja: 'フィリピン・クラークが位置するパンパンガ州の出身。幼少期に家族で来日し、日本で育つ。毎年のフィリピン帰省を通じて、現地の魅力や今後の成長性を肌で感じてきました。社会人になってからも帰省のたびにマカティやBGCなどを訪れ、目覚ましい発展を実感。その経験から、クラークも「次のBGC」になり得るのではないかと考え、早い段階から情報発信を始めることを決意しました。このメディアを通じて、フィリピンへの進出を検討する企業の皆様の後押しをしています。',
      en: "Born in Pampanga, the province where Clark is located, and raised in Japan from an early age. Annual trips back to the Philippines gave me a firsthand sense of the country's charm and growth potential. As an adult, visits to Makati and BGC on those trips showed just how far those areas had developed — which made me think Clark could become the next BGC. That's why I decided to start sharing information this early. Through this media, I support Japanese companies considering expansion into the Philippines.",
    },
    published: true,
  },
];
