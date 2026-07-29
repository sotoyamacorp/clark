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
      ja: [
        'フィリピン・クラークが位置するパンパンガ州の出身。幼少期に家族で来日し、日本で育ったこともあり、日本とフィリピン(パンパンガ)をつなぐことに強い使命感を持っています。',
        '大学時代にはイギリスに留学して国際開発学を専攻し、留学中はヨーロッパ各国を周遊。社会人になってからはシンガポールへの駐在も経験し、フィリピンを含むアセアン各国への出張を重ねる中で、国際的なビジネスの視点からもフィリピンの重要性と大きな可能性を実感してきました。',
        '帰省やマニラ出張のたびに、出身地のパンパンガやボラカイなどのビーチリゾートはもちろん、シンガポールさながらに発展したマカティやBGCにも足を運び、フィリピンの成長性を肌で感じてきました。その経験から、クラークも「次のBGC」になり得るのではないかと考え、早い段階から情報発信を始めることを決意しました。',
        '現在は、マニラの高級エリア「ロックウェル」がマニラ以外で初めて手がける同コンセプトのプロジェクトとして、アンヘレス(クラーク)のコンドミニアムを所有しています(建設中、2027年2月引き渡し予定)。',
        '現在は外資系企業に勤務しながら、このメディアを通じてフィリピンへの進出を検討する企業の皆様の後押しとサポートを行っています。',
      ].join('\n\n'),
      en: [
        "Born in Pampanga, the province where Clark is located, and raised in Japan from an early age, I feel a strong sense of mission to connect Japan and the Philippines (Pampanga).",
        "In university, I studied abroad in the UK, majoring in International Development, and used that time to travel around Europe. Later, a secondment in Singapore and business trips across ASEAN, including the Philippines, gave me a firsthand, business-side view of just how important — and full of potential — the Philippines is internationally.",
        "On trips back home and business visits to Manila, I've made a point of returning not only to my hometown of Pampanga and beach resorts like Boracay, but also to Makati and BGC — areas that have developed the way Singapore has — and seeing that growth firsthand gave me a real sense of the Philippines' potential. That experience led me to believe Clark could become the next BGC, and to start sharing information about it early.",
        "I now own a condominium in Angeles (Clark) — Rockwell's first project outside Manila, built on the same concept as its upscale Manila development (still under construction, with handover expected in February 2027).",
        'I currently work at a foreign-owned company while running this media, supporting and assisting Japanese companies considering expansion into the Philippines.',
      ].join('\n\n'),
    },
    published: true,
  },
];
