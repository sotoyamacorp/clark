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
  ja: { history: '歴史', incentives: '税制優遇', policy: '政策・規制', infrastructure: 'インフラ', labor: '労働政策', economy: '経済', 'real-estate': '不動産', investment: '投資', 'ec-retail': 'EC・リテール' },
  en: { history: 'History', incentives: 'Tax Incentives', policy: 'Policy', infrastructure: 'Infrastructure', labor: 'Labor Policy', economy: 'Economy', 'real-estate': 'Real Estate', investment: 'Investment', 'ec-retail': 'E-Commerce & Retail' },
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
    slug: 'clark-nscr-airport-express-2026',
    publishedAt: new Date('2026-08-02T10:00:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク〜マカティを1時間で結ぶ「エアポート・エクスプレス」、JICA融資で始動',
        description:
          'クラーク国際空港とマカティCBDを1時間未満で結ぶ「エアポート・エクスプレス」計画の中身、JICA融資と参画企業の国際色、運輸省とクラークの関係まで解説します。',
        tags: ['NSCR', 'エアポート・エクスプレス', 'JICA', '鉄道', 'クラーク国際空港'],
      },
      en: {
        title: "The 'Airport Express' Will Link Clark and Makati in Under an Hour",
        description:
          "A rail link connecting Clark International Airport to Makati CBD in under an hour is under construction. Here's the JICA financing, the international contractors involved, and DOTr's own ties to Clark.",
        tags: ['NSCR', 'Airport Express', 'JICA', 'Railway', 'Clark International Airport'],
      },
    },
  },
  {
    slug: 'philippines-oecd-economic-survey-2026',
    publishedAt: new Date('2026-08-02T09:00:00'),
    category: 'policy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'OECD、フィリピン初の経済審査を発表：優遇税制見直し提言の意味',
        description:
          '2026年2月、OECDが対比初となる経済審査を発表。実施の背景、他ASEAN諸国との違い、政府・進出企業の反応、税制優遇見直し提言までを進出企業向けに解説します。',
        tags: ['OECD', '経済審査', '税制優遇', 'PEZA', 'フィリピン進出'],
      },
      en: {
        title: "OECD's First Philippines Survey: Why Its Tax Incentive Proposal Matters",
        description:
          "In February 2026, the OECD released its first-ever Economic Survey of the Philippines. Why now, how it compares to other ASEAN reviews, government and business reaction, and the tax incentive proposal.",
        tags: ['OECD', 'Economic Survey', 'Tax incentives', 'PEZA', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-digital-infrastructure-hub-2026',
    publishedAt: new Date('2026-08-02T09:30:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク・フリーポートがデジタルインフラ拠点へ：データセンター投資相次ぐ',
        description:
          '2026年3月、CDCとDICTがクラーク・フリーポート・ゾーンでデータセンター整備計画を始動。プログラムの中身、関心を示す他企業、エリアの基礎知識まで解説します。',
        tags: ['クラーク進出', 'データセンター', 'デジタルインフラ', 'CDC', 'DICT'],
      },
      en: {
        title: 'Clark Freeport Becomes a Digital Infrastructure Hub: Data Center Investment',
        description:
          "In March 2026, CDC and DICT launched a data center program in Clark Freeport Zone. The program in depth, other interested companies, and area background.",
        tags: ['Clark expansion', 'Data centers', 'Digital infrastructure', 'CDC', 'DICT'],
      },
    },
  },
  {
    slug: 'philippines-fdi-peza-gap-2026',
    publishedAt: new Date('2026-08-01T09:00:00'),
    category: 'investment',
    region: 'philippines',
    translations: {
      ja: {
        title: 'PEZA投資承認は67%増なのに実際のFDIは10年ぶり低水準：何が起きているか',
        description:
          'PEZAの投資承認額は2026年に入り前年比67%増の一方、BSP統計の実際のFDI流入額は10年ぶりの低水準。一見矛盾する2つの数字の意味を、進出企業向けに解説します。',
        tags: ['FDI', 'PEZA', '対内直接投資', '投資動向', 'フィリピン進出'],
      },
      en: {
        title: "PEZA Approvals Up 67%, But Actual FDI Hits a 10-Year Low: What's Going On",
        description:
          "PEZA's investment approvals are up 67% year-on-year in 2026, while BSP's actual FDI inflow data shows a 10-year low. Here's what these two seemingly contradictory numbers actually mean.",
        tags: ['FDI', 'PEZA', 'Foreign direct investment', 'Investment trends', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-korean-tourism-investment-2026',
    publishedAt: new Date('2026-08-01T09:30:00'),
    category: 'real-estate',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラークで韓国系デベロッパーがホテル・MICE投資を加速：産業だけではない多角的な成長',
        description:
          '韓国系デベロッパーJnHとLuxiaが、クラークでホテル・サービスアパートメント等の投資を相次いで実行。産業用地・半導体だけではないクラークの多角的な成長を解説します。',
        tags: ['クラーク観光投資', 'MICE', '韓国系デベロッパー', 'CDC', 'フィリピン進出'],
      },
      en: {
        title: 'Korean Developers Accelerate Hotel and MICE Investment in Clark: Growth Beyond Industry',
        description:
          "Korean developers JnH and Luxia have both moved forward on hotel and serviced-apartment investments in Clark. Here's what these deals signal about Clark's growth beyond manufacturing and semiconductors.",
        tags: ['Clark tourism investment', 'MICE', 'Korean developers', 'CDC', 'Philippines expansion'],
      },
    },
  },
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
        tags: ['外資規制', 'ネガティブリスト', 'EO113', '小売業', 'フィリピン進出', 'EC・リテール'],
      },
      en: {
        title: 'The Philippines Eases Foreign Ownership Rules: What EO 113 Means for Japanese Companies',
        description:
          'What changed under Executive Order 113 (the 13th Foreign Investment Negative List), signed in April 2026 and effective in May 2026 — with a focus on retail and what it means for Japanese companies.',
        tags: ['Foreign ownership rules', 'Negative List', 'EO 113', 'Retail trade', 'Philippines expansion', 'E-Commerce & Retail'],
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
    publishedAt: new Date('2026-07-29T23:59:00'),
    category: 'investment',
    region: 'philippines',
    translations: {
      ja: {
        title: 'マルコス大統領、東京で日本企業から34億ドルの投資公約獲得：進出検討企業への示唆',
        description:
          '2026年5月26〜29日の国賓訪日中、東京で開催されたビジネス円卓会議で、フィリピンは日本企業から34億ドル(約210億ペソ)の投資公約を獲得。政府と日本企業の協働の実態を解説します。',
        tags: ['日比投資', '東京ビジネス円卓会議', 'マルコス大統領', '対日投資誘致', 'フィリピン進出'],
      },
      en: {
        title: 'President Marcos Secures $3.4B in Investment Pledges from Japanese Firms in Tokyo',
        description:
          "During a May 26-29, 2026 State Visit to Japan, a business roundtable in Tokyo secured the Philippines $3.4 billion (roughly ₱210 billion) in investment pledges from Japanese companies. Here's what the visit and the collaboration behind it involved.",
        tags: ['Japan-Philippines investment', 'Tokyo Business Roundtable', 'President Marcos', 'Foreign investment', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'philippines-gdp-growth-q1-2026',
    publishedAt: new Date('2026-07-30T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピンGDP、2026年1-3月期は2.8%成長に鈍化：5年ぶり低水準と日本企業への影響',
        description:
          'フィリピン統計局発表の2026年第1四半期GDP成長率は前年同期比2.8%で、政府目標を大きく下回りました。鈍化の背景と進出企業が注視すべき点を解説します。',
        tags: ['GDP成長率', 'フィリピン経済', '投資環境', 'マクロ経済', 'フィリピン進出'],
      },
      en: {
        title: 'Philippine GDP Growth Slows to 2.8% in Q1 2026: A 5-Year Low and What It Means for Japanese Companies',
        description:
          "The Philippine Statistics Authority reported 2.8% year-on-year GDP growth for Q1 2026, well below the government's target. Here's why, and what it means for expansion planning.",
        tags: ['GDP growth', 'Philippine economy', 'Investment climate', 'Macroeconomics', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-industrial-real-estate-2026',
    publishedAt: new Date('2026-07-30T09:30:00'),
    category: 'real-estate',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラークの産業用地、既存投資家が増床：Berthaphil拡張から読む需要動向',
        description:
          'クラーク・フリーポート・ゾーンの老舗デベロッパーBerthaphilが4.1ヘクタール増床。既存投資家の拡張から見える産業用地の需要動向と、進出企業への示唆を解説します。',
        tags: ['クラーク産業用地', 'Berthaphil', 'CDC', '工業団地', 'フィリピン進出'],
      },
      en: {
        title: "Clark's Industrial Land Market: An Established Developer Expands, What It Signals",
        description:
          "Berthaphil, one of Clark Freeport Zone's original investors, has added 4.1 hectares to its portfolio. Here's what this expansion signals about industrial land demand, and what it means for companies exploring Clark.",
        tags: ['Clark industrial land', 'Berthaphil', 'CDC', 'Industrial parks', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'philippines-peso-inflation-bsp-2026',
    publishedAt: new Date('2026-07-31T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'ペソが史上最安値、BSPは利上げへ転換：日本企業が注視すべき為替・金利動向',
        description:
          'フィリピンペソが2026年7月に史上最安値を更新。中央銀行BSPは利下げから利上げへ転換しました。背景と、進出企業が為替・金利面で押さえておきたいポイントを解説します。',
        tags: ['フィリピンペソ', 'BSP', 'インフレ', '金利', 'フィリピン進出'],
      },
      en: {
        title: 'Peso Hits Record Low as BSP Pivots to Rate Hikes: What Japanese Companies Should Watch',
        description:
          "The Philippine peso hit a record low in July 2026, and the central bank BSP has pivoted from cutting to hiking rates. Here's the background and what it means for companies operating in the Philippines.",
        tags: ['Philippine peso', 'BSP', 'Inflation', 'Interest rates', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-semiconductor-exports-2026',
    publishedAt: new Date('2026-07-31T09:30:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラークの半導体・電子部品輸出38億ドルに：CDCが企業と対話、次の一手は',
        description:
          'クラーク・フリーポート・ゾーンの半導体・電子部品輸出が2025年に38億ドルに到達。CDCが企業と課題を協議した内容と、日本企業への示唆を解説します。',
        tags: ['クラーク半導体', 'CDC', '電子部品輸出', 'Pax Silica', 'フィリピン進出'],
      },
      en: {
        title: "Clark's Semiconductor Exports Hit $3.8B: CDC Talks with Locators, What's Next",
        description:
          "Semiconductor and electronics exports from Clark Freeport Zone reached $3.8 billion in 2025. Here's what CDC discussed with locator companies, and what it means for Japanese firms.",
        tags: ['Clark semiconductor', 'CDC', 'Electronics exports', 'Pax Silica', 'Philippines expansion'],
      },
    },
  },
];

export const sortedArticles = [...articles].sort(
  (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
);

// 記事末尾の「関連記事」表示に使う関連度スコアリング。
// タグの一致(最重視)→カテゴリー一致→地域一致の順で重み付けし、
// 同点の場合は新しい記事を優先する。関連度が低くても枠は必ず埋める
// (何も出ないより、直近の他記事が出る方が回遊性に貢献するため)。
export function getRelatedArticles(currentSlug: string, locale: Locale, count = 3): Article[] {
  const current = articles.find((a) => a.slug === currentSlug);
  if (!current) return [];

  const currentTags = new Set(current.translations[locale].tags);

  return articles
    .filter((a) => a.slug !== currentSlug && !a.draft)
    .map((a) => {
      const sharedTags = a.translations[locale].tags.filter((tag) => currentTags.has(tag)).length;
      let score = sharedTags * 3;
      if (a.category === current.category) score += 2;
      if (a.region === current.region) score += 1;
      return { article: a, score };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return b.article.publishedAt.getTime() - a.article.publishedAt.getTime();
    })
    .slice(0, count)
    .map((x) => x.article);
}
