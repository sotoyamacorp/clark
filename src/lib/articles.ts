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
    slug: 'clark-cdc-auto-renew-business-permits-2026',
    publishedAt: new Date('2026-08-22T09:00:00'),
    category: 'policy',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク事業許可、220社が自動更新:対象条件と実務',
        description: 'CDCが適格ロケーター220社の事業許可を自動更新。従来の3年更新との違い、対象外にならないための確認事項を解説します。',
        tags: ['クラーク進出', 'CDC', '事業許可', '自動更新', '規制対応'],
      },
      en: {
        title: 'Clark Auto-Renews Business Permits for 220 Locators: A Compliance Guide',
        description: 'CDC has started automatic annual permit renewal for 220 qualified locators. Here is what changed and what companies must still manage.',
        tags: ['Clark investment', 'CDC', 'Business permits', 'Automatic renewal', 'Compliance'],
      },
    },
  },
  {
    slug: 'philippines-manufacturing-pmi-2026',
    publishedAt: new Date('2026-08-22T08:30:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピン製造業PMI、7月51.8で5カ月ぶり高水準:供給網リスクも残る',
        description: '2026年7月のフィリピン製造業PMIは51.8、3カ月連続拡大で5カ月ぶり高水準に。半年間の推移とASEAN比較、供給網・コスト圧力、日本企業への示唆を解説します。',
        tags: ['製造業PMI', 'フィリピン経済', 'サプライチェーン', 'ASEAN', 'フィリピン進出'],
      },
      en: {
        title: 'Philippines Manufacturing PMI Hits 51.8, a 5-Month High — But Supply Risks Remain',
        description: "July 2026's Philippines Manufacturing PMI rose to 51.8, a third straight month of growth. See the 6-month trend, ASEAN comparison, and what it means for Japanese firms.",
        tags: ['Manufacturing PMI', 'Philippine Economy', 'Supply Chain', 'ASEAN', 'Philippines Expansion'],
      },
    },
  },
  {
    slug: 'clark-food-hub-2026',
    publishedAt: new Date('2026-08-22T09:00:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク国立フードハブ、建設加速 コールドチェーンに商機',
        description: 'フィリピン農業省がクラーク国立フードハブの建設を加速。40ヘクタールで着工し2027年末の一部稼働を目指します。コールドチェーン・食品加工分野の日本企業への商機を解説します。',
        tags: ['クラーク国立フードハブ', 'コールドチェーン', '食料安全保障', '農業物流', 'クラーク進出'],
      },
      en: {
        title: 'Clark National Food Hub construction accelerates: an opening for cold chain investors',
        description: 'The Philippine Department of Agriculture is fast-tracking the Clark National Food Hub, targeting a 2027 partial launch on 40 hectares. What it means for cold chain and food processing firms.',
        tags: ['Clark National Food Hub', 'Cold chain', 'Food security', 'Agri-logistics', 'Clark expansion'],
      },
    },
  },
  {
    slug: 'philippines-bank-lending-growth-2026',
    publishedAt: new Date('2026-08-22T08:30:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピン銀行融資、5月12.1%から6月9.8%に鈍化:進出企業が読むべき資金調達環境',
        description: 'フィリピン銀行融資は2026年5月に前年比12.1%(15カ月ぶり高水準)まで加速後、6月は9.8%に鈍化。BSP統計を基に月次推移・業種別動向・進出企業への意味を解説します。',
        tags: ['フィリピン銀行融資', 'BSP', 'フィリピン経済', '資金調達', 'フィリピン進出'],
      },
      en: {
        title: 'Philippine Bank Lending: From 12.1% in May to 9.8% in June — What Investors Should Watch',
        description: 'Philippine bank lending growth accelerated to 12.1% y/y in May 2026, a 15-month high, then slowed to 9.8% in June. A BSP-based month-by-month read for expanding firms.',
        tags: ['Philippine Bank Lending', 'BSP', 'Philippine Economy', 'Financing', 'Philippines Expansion'],
      },
    },
  },
  {
    slug: 'philippines-peza-investment-approvals-2026',
    publishedAt: new Date('2026-08-21T09:00:00'),
    category: 'investment',
    region: 'philippines',
    translations: {
      ja: {
        title: 'PEZA投資承認1,519億ペソ、7カ月で前年比67%増:業種・国別動向',
        description: 'PEZAの2026年1〜7月投資承認額は1,519億ペソ、前年比67%増。業種別・投資国別の内訳、通期目標3,000億ペソへの進捗ペース、承認額と投資実行の違いを解説します。',
        tags: ['PEZA', '投資承認', 'フィリピン進出', '経済特区', '外資投資動向'],
      },
      en: {
        title: 'PEZA Approves ₱151.9B in Investments, Up 67% YoY: Sector Breakdown',
        description: "PEZA approved ₱151.9B in investments from January-July 2026, up 67% YoY. We break down the sectors, source countries, pace toward the ₱300B annual target, and why approvals aren't guaranteed capital.",
        tags: ['PEZA', 'Investment approvals', 'Philippines expansion', 'Economic zones', 'FDI trends'],
      },
    },
  },
  {
    slug: 'philippines-credit-rating-outlook-2026',
    publishedAt: new Date('2026-08-21T08:30:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピン格付け見通し引き下げ:Fitch・S&Pが表明、投資適格級は維持',
        description: '2026年4月、Fitchが見通しをネガティブへ、S&Pをポジティブから安定的へ引き下げ。格下げではなく見通し変更で、投資適格級BBB台は維持。日本企業への実務的な意味を解説。',
        tags: ['フィリピン格付け', 'Fitch', 'S&P', '信用リスク', 'フィリピン進出'],
      },
      en: {
        title: 'Philippines Credit Outlook Cut by Fitch and S&P: Investment Grade Intact',
        description: "In April 2026, Fitch moved the Philippines' outlook to negative and S&P to stable — not a downgrade. Ratings stayed investment grade. What it means for Japanese businesses.",
        tags: ['Philippines credit rating', 'Fitch', 'S&P', 'sovereign risk', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-wfzo-global-network-2026',
    publishedAt: new Date('2026-08-20T09:00:00'),
    category: 'investment',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラークが経済特区の国際団体WFZOと会談、海外発信での連携を打診',
        description: '2026年8月、クラーク開発公社(CDC)が163カ国・約1600の経済特区が加盟するWFZOと会談。申し出の中身と、進出企業にとっての実務的な意味を整理します。',
        tags: ['WFZO', 'CDC', 'クラーク経済特区', '国際提携', '投資誘致'],
      },
      en: {
        title: 'Clark Meets Global Free Zone Body WFZO Over International Exposure',
        description: "In August 2026, Clark Development Corporation met with the World Free Zones Organization, which offered to feature Clark on its global platforms. What it does and doesn't mean for investors.",
        tags: ['WFZO', 'CDC', 'Clark Freeport Zone', 'International partnership', 'Investment promotion'],
      },
    },
  },
  {
    slug: 'philippines-rcoa-100kw-retail-power-2026',
    publishedAt: new Date('2026-08-20T08:30:00'),
    category: 'policy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピン電力自由化100kWへ:企業の切替判断を解説',
        description: '2026年6月のRCOA・RAP基準引下げで対象が拡大。契約比較と切替前の確認事項を解説します。',
        tags: ['RCOA', 'RAP', 'フィリピン電力', 'ERC', '電力小売自由化'],
      },
      en: {
        title: 'Philippine retail power threshold falls to 100 kW',
        description: 'RCOA and RAP expanded in June 2026. A practical guide to eligibility, supplier comparisons and switching risks for businesses.',
        tags: ['RCOA', 'RAP', 'Philippine electricity', 'ERC', 'retail competition'],
      },
    },
  },
  {
    slug: 'clark-ciac-locator-process-2026',
    publishedAt: new Date('2026-08-19T09:00:00'),
    category: 'policy',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク航空都市へ進出する6段階:CIACロケーター手続き',
        description: 'CIACへの意向書から賃貸契約、CDCの許認可、操業開始までを日本企業向けに整理します。',
        tags: ['CIAC', 'Clark Aviation Capital', 'クラーク進出', 'CDC', 'ロケーター'],
      },
      en: {
        title: 'Six steps to become a locator in Clark Aviation Capital',
        description: "A practical guide to CIAC's letter of intent, lease process, CDC registration, permits and start of operations.",
        tags: ['CIAC', 'Clark Aviation Capital', 'Clark investment', 'CDC', 'locator'],
      },
    },
  },
  {
    slug: 'philippines-green-lane-investments-2026',
    publishedAt: new Date('2026-08-19T08:30:00'),
    category: 'policy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピンGreen Lane投資3510億ペソ:申請実務を解説',
        description: '2026年上期の認定17件とGreen Laneの対象、必要書類、税制優遇との違いを解説します。',
        tags: ['Green Lane', 'フィリピン投資', 'BOI', 'EO18', '許認可'],
      },
      en: {
        title: 'Philippine Green Lane investments reach PHP351 billion',
        description: 'What the 17 projects certified in H1 2026 mean, who qualifies, what documents are required and what Green Lane does not provide.',
        tags: ['Green Lane', 'Philippine investment', 'BOI', 'EO18', 'permits'],
      },
    },
  },
  {
    slug: 'philippines-national-single-window-2026',
    publishedAt: new Date('2026-08-18T09:00:00'),
    category: 'policy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピン輸出入、National Single Window始動:何が変わるか',
        description: '輸出入許認可を一つの電子窓口に集約するNSWが試験稼働。72機関の段階導入と日本企業の準備を解説します。',
        tags: ['National Single Window', 'フィリピン貿易', '通関', '貿易円滑化', 'ASEAN'],
      },
      en: {
        title: 'Philippines Launches National Single Window: What Importers Should Prepare',
        description: 'The Philippines has piloted a single digital gateway for trade permits. We explain the 72-agency rollout and what businesses should prepare.',
        tags: ['National Single Window', 'Philippine trade', 'Customs', 'Trade facilitation', 'ASEAN'],
      },
    },
  },
  {
    slug: 'philippines-mterra-solar-bess-2026',
    publishedAt: new Date('2026-08-18T08:30:00'),
    category: 'infrastructure',
    region: 'philippines',
    translations: {
      ja: {
        title: 'MTerra Solarが8月商用化へ:蓄電池併設が企業電力に与える意味',
        description: '世界最大級の太陽光・蓄電池一体施設がフィリピンで商用化へ。規模、電力安定化、企業調達への影響を解説します。',
        tags: ['MTerra Solar', '蓄電池', '再生可能エネルギー', '電力調達', 'フィリピン進出'],
      },
      en: {
        title: 'MTerra Solar Targets August Operations: What Its Battery Means for Business',
        description: "One of the world's largest integrated solar and battery projects is nearing operations. We explain its scale and implications for corporate power.",
        tags: ['MTerra Solar', 'Battery storage', 'Renewable energy', 'Power procurement', 'Philippines investment'],
      },
    },
  },
  {
    slug: 'philippines-submarine-cable-customs-2026',
    publishedAt: new Date('2026-08-17T09:00:00'),
    category: 'infrastructure',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピン海底ケーブル船、関税手続き簡素化:CAO 02-2026',
        description: 'CAO 02-2026で外国の海底ケーブル敷設・修理船の一時輸入を簡素化。免税範囲、再輸出条件、データセンター事業への意味を解説します。',
        tags: ['海底ケーブル', 'CAO 02-2026', 'データセンター', 'デジタルインフラ', 'フィリピン進出'],
      },
      en: {
        title: 'Philippines Streamlines Customs for Cable Ships Under CAO 02-2026',
        description: 'CAO 02-2026 simplifies temporary admission of foreign cable ships. We explain duty relief, re-export conditions, and implications for data centers.',
        tags: ['Submarine cables', 'CAO 02-2026', 'Data centers', 'Digital infrastructure', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-heatcon-composite-repair-2026',
    publishedAt: new Date('2026-08-17T08:30:00'),
    category: 'investment',
    region: 'clark',
    translations: {
      ja: {
        title: 'Boeing供給企業Heatcon、クラークに複合材修理拠点',
        description: 'Heatcon Asiaがクラークで25年契約。航空機の複合材修理・製造・材料流通の集積が生む事業機会を解説します。',
        tags: ['Heatcon', '航空MRO', '複合材', 'Boeing', 'クラーク進出'],
      },
      en: {
        title: 'Boeing supplier Heatcon establishes a composite repair base in Clark',
        description: 'Heatcon Asia signs 25-year lease in Clark. Explains the business opportunities arising from the agglomeration of aircraft composite repair, manufacturing, and materials distribution.',
        tags: ['Heatcon', 'Aircraft MRO', 'Composite materials', 'Boeing', 'Clark expansion'],
      },
    },
  },
  {
    slug: 'clark-rbelt-local-tax-2026',
    publishedAt: new Date('2026-08-16T09:00:00'),
    category: 'incentives',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク進出企業の地方税、最大2%に整理:RBELT実務ガイド',
        description: 'CREATE MORE後の地方税をJMC 01-2026が整理。クラーク登録企業が確認すべきRBELTの対象、税率、SCITとの違いを解説します。',
        tags: ['RBELT', 'CREATE MORE', 'クラーク進出', '地方税', '税制優遇'],
      },
      en: {
        title: 'Clark Local Tax Clarified: A Practical Guide to the 2% RBELT Cap',
        description: 'JMC 01-2026 clarifies local taxes after CREATE MORE. Here is what Clark-registered firms need to know about RBELT, ITH, EDR, and SCIT.',
        tags: ['RBELT', 'CREATE MORE', 'Clark expansion', 'Local tax', 'Tax incentives'],
      },
    },
  },
  {
    slug: 'philippines-record-exports-june-2026',
    publishedAt: new Date('2026-08-16T08:30:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピン輸出、6月に過去最高87.7億ドル:電子製品が6割',
        description: '2026年6月のフィリピン輸出は87.7億ドルで過去最高。電子製品の寄与、輸入増と49.4億ドルの赤字、日本企業への示唆を解説します。',
        tags: ['フィリピン輸出', '電子製品', '半導体', '貿易統計', 'フィリピン進出'],
      },
      en: {
        title: 'Philippine Exports Hit Record $8.77B in June, Led by Electronics',
        description: "Philippine exports hit a record $8.77B in June 2026. We unpack electronics' 60% share, the $4.94B trade deficit, and implications for investors.",
        tags: ['Philippine exports', 'Electronics', 'Semiconductors', 'Trade data', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'philippines-salary-budget-2027',
    publishedAt: new Date('2026-08-15T09:00:00'),
    category: 'labor',
    region: 'philippines',
    translations: {
      ja: {
        title: '2027年のフィリピン昇給率は5.1%予測:人件費計画の見方',
        description: 'WTW調査で2027年のフィリピン昇給率予測は中央値5.1%。周辺国比較、最低賃金との違い、人件費予算への織り込み方を解説します。',
        tags: ['昇給率', '人件費', '採用', '最低賃金', 'フィリピン進出'],
      },
      en: {
        title: 'Philippine Salary Increases Projected at 5.1% in 2027: How to Build a Labor-Cost Budget',
        description: 'WTW projects a 5.1% median salary increase budget in the Philippines for 2027. We explain regional comparisons and practical budgeting.',
        tags: ['Salary increase', 'Labor costs', 'Hiring', 'Minimum wage', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'philippines-japan-tax-treaty-2026',
    publishedAt: new Date('2026-08-14T09:30:00'),
    category: 'policy',
    region: 'philippines',
    translations: {
      ja: {
        title: '新日比租税条約、配当源泉税は最低5%へ:発効前に確認すべき点',
        description: '日本とフィリピンが新租税条約に署名。配当・利子・使用料の上限税率、恒久的施設、仲裁、発効条件を日本企業向けに整理します。',
        tags: ['日比租税条約', '源泉税', '配当', '二重課税', 'フィリピン進出'],
      },
      en: {
        title: 'New Philippines-Japan Tax Treaty: 5% Dividend Rate and What to Check Before It Takes Effect',
        description: 'Japan and the Philippines signed a new tax treaty. We explain dividend, interest and royalty rates, permanent establishments, arbitration, and timing.',
        tags: ['Philippines-Japan tax treaty', 'Withholding tax', 'Dividends', 'Double taxation', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-sipp-priority-sectors-2026',
    publishedAt: new Date('2026-08-14T09:00:00'),
    category: 'incentives',
    region: 'clark',
    translations: {
      ja: {
        title: '2026年SIPP、クラーク進出で狙える4分野:優遇は「自動」ではない',
        description: '2026年SIPPで半導体、航空MRO、物流、データセンターが優先分野に。クラーク進出時の適合性と申請上の注意点を整理します。',
        tags: ['2026年SIPP', 'クラーク進出', '税制優遇', '半導体', '航空MRO'],
      },
      en: {
        title: 'Clark and the 2026 SIPP: Four Priority Sectors, but Incentives Are Not Automatic',
        description: 'The 2026 SIPP prioritizes semiconductors, aircraft MRO, logistics, and data centers. Here is how Clark investors should assess eligibility.',
        tags: ['2026 SIPP', 'Clark investment', 'Tax incentives', 'Semiconductors', 'Aircraft MRO'],
      },
    },
  },
  {
    slug: 'clark-inari-amertron-semiconductor-2026',
    publishedAt: new Date('2026-08-13T09:00:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'マレーシア半導体大手Inari Amertron、クラークに第3拠点「CK3」検討:AI需要が追い風',
        description:
          'マレーシアの半導体大手Inari Amertronが、クラークでの第3拠点「CK3」新設を検討。生産能力30%増・600人の新規雇用を見込み、AI・データセンター向け先端電子部品の生産拡大が狙いです。',
        tags: ['半導体', 'Inari Amertron', 'マレーシア投資', 'AI', 'クラーク進出'],
      },
      en: {
        title: "Malaysian Chip Giant Inari Amertron Eyes Third Clark Site, 'CK3,' Riding AI Demand",
        description:
          'Malaysian semiconductor major Inari Amertron is considering a third Clark facility, CK3, targeting a 30% capacity boost and 600 new jobs to scale up production for AI and data center demand.',
        tags: ['Semiconductors', 'Inari Amertron', 'Malaysian investment', 'AI', 'Clark expansion'],
      },
    },
  },
  {
    slug: 'philippines-bsp-rate-outlook-2026',
    publishedAt: new Date('2026-08-12T09:30:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'BSP、8月27日会合は「利上げ見送り」の見方が浮上:利上げ路線から一転',
        description:
          'スタンダードチャータードがBSPの8月27日会合について、従来予想の利上げから一転「据え置き」に見方を変更。2026年GDP予測も4.0%→3.5%へ下方修正しました。',
        tags: ['BSP', '政策金利', '金融政策', 'スタンダードチャータード', 'フィリピン進出'],
      },
      en: {
        title: "BSP's August 27 Meeting: Rate Hold Now Expected, Reversing Prior Hike Call",
        description:
          'Standard Chartered now expects BSP to hold rates at its August 27 meeting, reversing its earlier hike call. It also cut its 2026 GDP forecast from 4.0% to 3.5%.',
        tags: ['BSP', 'Policy rate', 'Monetary policy', 'Standard Chartered', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'philippines-unemployment-youth-2026',
    publishedAt: new Date('2026-08-12T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: '6月の失業率4.9%に上昇:若年労働力59.2万人増と採用・賃金への影響',
        description:
          '2026年6月のフィリピン失業率は4.9%に上昇。若年労働力の構成、過去推移と先行きシナリオ、採用賃金への影響を整理します。',
        tags: ['失業率', '労働市場', '若年雇用', 'PSA', 'フィリピン進出'],
      },
      en: {
        title: 'Philippine Unemployment Hits 4.9%: Who Is in the Youth Labor Pool and What It Means for Wages',
        description:
          'Philippine unemployment rose to 4.9% in June 2026. We examine the youth labor pool, historical and forward scenarios, and implications for hiring and wages.',
        tags: ['Unemployment', 'Labor market', 'Youth employment', 'PSA', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'philippines-ev-incentive-eo121-2026',
    publishedAt: new Date('2026-08-11T11:00:00'),
    category: 'incentives',
    region: 'philippines',
    translations: {
      ja: {
        title: 'マルコス大統領、EV国内生産向け600億ペソ優遇策「EVIS」に署名:三菱自動車も呼応',
        description:
          'マルコス大統領がEV国内生産を後押しする大統領令121号(EVIS)に署名。最大600億ペソの財政支援で、三菱自動車も70億ペソのHEV国内生産投資を表明しました。',
        tags: ['EV優遇策', 'EVIS', '大統領令121号', '三菱自動車', 'フィリピン進出'],
      },
      en: {
        title: "Marcos Signs ₱60B 'EVIS' Incentive Program for Local EV Manufacturing; Mitsubishi Responds",
        description:
          "President Marcos signed EO 121 establishing the EVIS incentive program for local EV manufacturing, worth up to ₱60 billion. Mitsubishi Motors has already pledged a ₱7B HEV investment in response.",
        tags: ['EV incentives', 'EVIS', 'Executive Order 121', 'Mitsubishi Motors', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'philippines-analysts-growth-forecast-2026',
    publishedAt: new Date('2026-08-11T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: '民間エコノミストは軒並み下方修正:2026年成長率予測3〜3.9%、政府目標を下回る',
        description:
          '第2四半期GDPの下振れを受け、野村・ANZ・キャピタル・エコノミクス等が2026年フィリピン成長率予測を軒並み引き下げ。政府目標3.5〜4.5%を下回る水準で一致しています。',
        tags: ['GDP成長率', '経済見通し', '野村', 'ANZ', 'フィリピン進出'],
      },
      en: {
        title: "Private Economists Slash 2026 Growth Forecasts to 3-3.9%, Below Government Target",
        description:
          "Following the Q2 GDP miss, Nomura, ANZ, and Capital Economics have all cut their 2026 Philippine growth forecasts. All now sit below the government's 3.5-4.5% target range.",
        tags: ['GDP growth', 'Growth outlook', 'Nomura', 'ANZ', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-incheon-cosmetics-partnership-2026',
    publishedAt: new Date('2026-08-11T09:30:00'),
    category: 'investment',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク開発公社、韓国インチョン経済自由区域と提携:化粧品製造の移管も視野',
        description:
          'CDCが韓国インチョン経済自由区域(IFEZ)と提携し、製造業・BPO分野での協力を強化。韓国の化粧品・美容製品製造のクラーク移管も検討されています。姉妹経済区域の枠組みを解説します。',
        tags: ['IFEZ', '韓国投資', '化粧品製造', 'CDC', 'クラーク進出'],
      },
      en: {
        title: "Clark Development Corp Partners With South Korea's Incheon Free Economic Zone",
        description:
          "CDC has partnered with South Korea's Incheon Free Economic Zone (IFEZ) to strengthen manufacturing and BPO cooperation, with Korean cosmetics manufacturing relocation among the focus areas.",
        tags: ['IFEZ', 'Korean investment', 'Cosmetics manufacturing', 'CDC', 'Clark expansion'],
      },
    },
  },
  {
    slug: 'philippines-rice-tariff-inflation-2026',
    publishedAt: new Date('2026-08-10T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピンの7月インフレ6.2%に鈍化も高止まり:コメ関税トリガー制度とは',
        description:
          '2026年7月のフィリピン消費者物価上昇率は6.2%と前月から鈍化も、依然目標レンジを大幅に上回る水準。コメ価格を左右する新しい四半期関税トリガー制度を解説します。',
        tags: ['インフレ', 'コメ関税', '消費者物価', 'PSA', 'フィリピン進出'],
      },
      en: {
        title: "PH Inflation Eases to 6.2% in July, Still Elevated: The New Rice Tariff Trigger",
        description:
          "Philippine consumer price inflation eased to 6.2% in July 2026, still well above target. Here's how the new quarterly rice tariff trigger system, a key driver, actually works.",
        tags: ['Inflation', 'Rice tariff', 'Consumer prices', 'PSA', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-ups-logistics-hub-2026',
    publishedAt: new Date('2026-08-10T09:30:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'UPSがクラーク新拠点を9月開業へ:LIPADとCIACの違いも整理',
        description:
          'UPSがクラーク国際空港に新物流拠点を開業。アジア太平洋2.5億ドル超の投資計画の一環で、空港運営会社LIPADとの提携協定を締結しました。CIACとの違いも解説します。',
        tags: ['UPS', '航空貨物', '物流ハブ', 'LIPAD', 'クラーク国際空港'],
      },
      en: {
        title: "UPS's New Clark Hub Opens in September: LIPAD vs. CIAC, Explained",
        description:
          "UPS is opening a new logistics hub at Clark International Airport as part of a $250M+ Asia-Pacific investment plan, partnering with airport operator LIPAD. Here's how LIPAD differs from CIAC.",
        tags: ['UPS', 'Air cargo', 'Logistics hub', 'LIPAD', 'Clark International Airport'],
      },
    },
  },
  {
    slug: 'philippines-q2-gdp-slowdown-2026',
    publishedAt: new Date('2026-08-09T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: '第2四半期GDP2.3%、2009年以来の低水準:下半期目標は4.4%へ上昇',
        description:
          '2026年第2四半期の実質GDP成長率は2.3%とコロナ後最低を記録。鉱工業がマイナス成長に転じる中、下半期に必要な成長率は3.7%から4.4%へ上方修正されました。',
        tags: ['GDP成長率', '第2四半期', 'DEPDev', '経済見通し', 'フィリピン進出'],
      },
      en: {
        title: "Q2 GDP Slows to 2.3%, Weakest Since 2009: H2 Target Rises to 4.4%",
        description:
          "Philippine real GDP growth slowed to 2.3% in Q2 2026, the weakest since 2009 excluding the pandemic. With industry now contracting, the growth needed in H2 has risen from 3.7% to 4.4%.",
        tags: ['GDP growth', 'Q2 2026', 'DEPDev', 'Growth outlook', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-mice-tourism-hub-2026',
    publishedAt: new Date('2026-08-09T09:30:00'),
    category: 'investment',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク、アジア最高のMICE都市に選出:来訪者3,300万人・稼働率85%',
        description:
          'クラークが世界旅行大賞でアジア最高のMICE都市に選出。2025年の来訪者数は3,300万人超、ホテル稼働率は70〜85%まで回復し、新規1,300室の開発も進んでいます。',
        tags: ['MICE', '観光', 'ホテル', 'クラーク国際空港', '世界旅行大賞'],
      },
      en: {
        title: "Clark Named Asia's Top MICE City: 33 Million Visitors, 85% Occupancy",
        description:
          "Clark was named Asia's Leading Meetings and Conference Destination at the World Travel Awards. 2025 saw over 33 million visitors, hotel occupancy near 85%, and 1,300 new rooms in the pipeline.",
        tags: ['MICE', 'Tourism', 'Hotels', 'Clark International Airport', 'World Travel Awards'],
      },
    },
  },
  {
    slug: 'philippines-jpepa-trade-2026',
    publishedAt: new Date('2026-08-08T09:00:00'),
    category: 'policy',
    region: 'philippines',
    translations: {
      ja: {
        title: '日比貿易額は過去最高1.27兆ペソ(約220億ドル)、JPEPA改定交渉も本格化',
        description:
          '2025年の日比貿易額は1.27兆ペソ(約220億ドル)規模に。JPEPA(日比経済連携協定)発効から約18年、自動車関税を中心とした改定交渉も進んでいます。進出企業への影響を解説します。',
        tags: ['JPEPA', '日比貿易', '関税', '日本企業', 'フィリピン進出'],
      },
      en: {
        title: "PH-Japan Trade Hits a Record ₱1.27T ($22B), as JPEPA Revision Talks Advance",
        description:
          "Philippines-Japan bilateral trade reached a record ₱1.27 trillion (roughly $22 billion) in 2025. Roughly 18 years after JPEPA took effect, revision talks focused on auto tariffs are now underway.",
        tags: ['JPEPA', 'Philippines-Japan trade', 'Tariffs', 'Japanese companies', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-jamco-aerospace-investment-2026',
    publishedAt: new Date('2026-08-08T09:30:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: '日本のJamco、クラークに6億ペソ投資:日本から最終組立を移管',
        description:
          '日本の航空機内装大手ジャムコの現地法人が、クラーク航空拠点に6億ペソを投資。日本国内で行っていた最終組立をクラークへ移管し、従業員数を450人から1,400人へ拡大します。',
        tags: ['ジャムコ', '航空宇宙産業', 'MRO', 'クラーク国際空港', '日本企業'],
      },
      en: {
        title: "Japan's Jamco Invests ₱600M in Clark, Shifting Final Assembly From Japan",
        description:
          "Japanese aircraft interiors maker Jamco's local subsidiary is investing ₱600 million in Clark Aviation Capital, shifting final assembly from Japan and growing its workforce from 450 to 1,400.",
        tags: ['Jamco', 'Aerospace industry', 'MRO', 'Clark International Airport', 'Japanese companies'],
      },
    },
  },
  {
    slug: 'philippines-ofw-remittances-2026',
    publishedAt: new Date('2026-08-07T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'OFW送金は過去最高356億ドルも、伸び率は4年ぶりの低水準に',
        description:
          '2025年のOFW送金は過去最高の356.3億ドル(GDP比7.3%)を記録。しかし2026年に入り伸び率が鈍化し、5月は4年ぶりの低い伸びに。消費への影響を解説します。',
        tags: ['OFW送金', '海外送金', '個人消費', 'BSP', 'フィリピン進出'],
      },
      en: {
        title: 'OFW Remittances Hit a Record $35.6B, But Growth Slows to a 4-Year Low',
        description:
          "OFW remittances hit a record $35.6 billion (7.3% of GDP) in 2025. But growth has slowed sharply in 2026, hitting a four-year low in May. Here's what it means for consumer demand.",
        tags: ['OFW remittances', 'Overseas remittances', 'Household consumption', 'BSP', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-office-market-2026',
    publishedAt: new Date('2026-08-07T09:30:00'),
    category: 'real-estate',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラークのオフィス市場、空室率19.8%まで改善:BPO大手の進出が続く',
        description:
          'パンパンガのオフィス空室率が24.4%から19.8%まで改善。Sutherland・DXC・IntouchCXなどBPO大手の進出が続き、2026〜29年には8.6万平米の新規供給も予定されています。',
        tags: ['オフィス市場', 'BPO', '空室率', 'クラーク進出', '不動産'],
      },
      en: {
        title: "Clark's Office Market: Vacancy Falls to 19.8% as BPO Majors Keep Moving In",
        description:
          "Pampanga's office vacancy rate has improved from 24.4% to 19.8%. BPO majors like Sutherland, DXC, and IntouchCX keep expanding, with 86,000 sqm of new supply planned for 2026-29.",
        tags: ['Office market', 'BPO', 'Vacancy rate', 'Clark expansion', 'Real estate'],
      },
    },
  },
  {
    slug: 'philippines-h2-growth-target-2026',
    publishedAt: new Date('2026-08-06T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: '政府は下半期に自信、世界銀行は慎重：フィリピン成長率をめぐる温度差',
        description:
          '第1四半期2.8%成長にとどまったフィリピン経済。政府は残り3四半期平均3.7%成長で目標達成に自信を見せる一方、世界銀行はより慎重な見通しを示しています。',
        tags: ['GDP成長率', 'NEDA', 'バリサカン', '経済見通し', 'フィリピン進出'],
      },
      en: {
        title: 'Government Confident on H2, World Bank Cautious: A Growth Outlook Gap',
        description:
          "Philippine growth slowed to 2.8% in Q1 2026. The government says catch-up spending will drive a strong H2 recovery, while the World Bank takes a more cautious view.",
        tags: ['GDP growth', 'NEDA', 'Balisacan', 'Growth outlook', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-bcda-investment-cbd-2026',
    publishedAt: new Date('2026-08-06T09:30:00'),
    category: 'investment',
    region: 'clark',
    translations: {
      ja: {
        title: 'BCDA投資承認64%増の535億ペソ、クラークに100ヘクタール新CBD構想も始動',
        description:
          'BCDAの投資承認額が2025年1〜7月で535億ペソ・前年比64%増に。クラーク・フリーポート内では「北ルソンのBGC」を目指す100ヘクタールのCBD構想も動き出しています。',
        tags: ['BCDA', '投資', 'クラークCBD', 'ニュークラークシティ', 'クラーク進出'],
      },
      en: {
        title: 'BCDA Investment Approvals Jump 64% to ₱53.5B, Plus a New 100-Hectare Clark CBD',
        description:
          "BCDA's investment approvals hit ₱53.5 billion in the first seven months of 2025, up 64% year-on-year. A 100-hectare Clark CBD, billed as the 'BGC of Northern Luzon,' is also taking shape.",
        tags: ['BCDA', 'Investment', 'Clark CBD', 'New Clark City', 'Clark expansion'],
      },
    },
  },
  {
    slug: 'philippines-worldbank-growth-outlook-2026',
    publishedAt: new Date('2026-08-05T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: '世界銀行、フィリピン成長率見通しを下方修正：洪水対策汚職スキャンダルの影響',
        description:
          '世界銀行が2026年8月、フィリピンの2027年成長率見通しを5.4%から5.2%へ下方修正。背景にある洪水対策インフラの汚職スキャンダルと、進出企業への影響を解説します。',
        tags: ['世界銀行', '経済見通し', '汚職スキャンダル', 'インフラ投資', 'フィリピン進出'],
      },
      en: {
        title: 'World Bank Cuts Philippine Growth Outlook, Citing Flood Control Graft',
        description:
          "In August 2026, the World Bank cut its 2027 Philippine growth forecast from 5.4% to 5.2%. Here's the flood-control infrastructure corruption scandal behind it, and what it means for companies.",
        tags: ['World Bank', 'Growth outlook', 'Corruption scandal', 'Infrastructure investment', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-fedex-southeast-asia-hub-2026',
    publishedAt: new Date('2026-08-05T09:30:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'FedExがクラークに8,000万ドル投資：東南アジアハブ化構想の中身',
        description:
          'FedExがクラーク国際空港に8,000万ドルを投資し、東南アジアの物流ハブ化を計画。BCDAの70億ペソ規模の支援策とあわせて、日本企業への意味を解説します。',
        tags: ['FedEx', '航空貨物', '物流ハブ', 'クラーク国際空港', 'BCDA'],
      },
      en: {
        title: 'FedEx Invests $80 Million in Clark: A Southeast Asia Hub Takes Shape',
        description:
          "FedEx is investing $80 million in Clark International Airport to build out a Southeast Asia logistics hub. Here's BCDA's ₱7 billion support package and what it means for Japanese companies.",
        tags: ['FedEx', 'Air cargo', 'Logistics hub', 'Clark International Airport', 'BCDA'],
      },
    },
  },
  {
    slug: 'philippines-energy-crisis-2026',
    publishedAt: new Date('2026-08-04T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: '2026年フィリピンのエネルギー危機とは：中東情勢と燃料価格高騰の全体像',
        description:
          '2026年2月のホルムズ海峡閉鎖を契機とした燃料価格高騰・停電で、フィリピンは国家エネルギー非常事態を宣言。背景・政府対応・企業への影響を整理します。',
        tags: ['エネルギー危機', '燃料価格', '中東情勢', '国家非常事態', 'フィリピン進出'],
      },
      en: {
        title: "The 2026 Philippine Energy Crisis: What Happened and Why It Matters",
        description:
          "Since the Strait of Hormuz closure in February 2026, fuel price spikes and blackouts led the Philippines to declare a national energy emergency. Here's the background and business impact.",
        tags: ['Energy crisis', 'Fuel prices', 'Middle East tensions', 'State of emergency', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-business-services-expansion-2026',
    publishedAt: new Date('2026-08-04T09:30:00'),
    category: 'investment',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラークで専門サービス・BPOの拡張相次ぐ：進出企業を支える体制が厚みを増す',
        description:
          '2026年7月、大手会計事務所P&AグラントソントンとBPO大手MicroSourcingがクラークで相次いで拠点拡張。進出企業を支えるサービス基盤の充実度を解説します。',
        tags: ['専門サービス', 'BPO', '会計事務所', 'クラーク進出', 'P&Aグラントソントン'],
      },
      en: {
        title: "Clark's Professional Services and BPO Base Deepens as Two Firms Expand",
        description:
          "In July 2026, accounting firm P&A Grant Thornton and BPO giant MicroSourcing both expanded into Clark. Here's what it signals about the support ecosystem for companies there.",
        tags: ['Professional services', 'BPO', 'Accounting firm', 'Clark expansion', 'P&A Grant Thornton'],
      },
    },
  },
  {
    slug: 'philippines-upper-middle-income-2026',
    publishedAt: new Date('2026-08-03T09:00:00'),
    category: 'economy',
    region: 'philippines',
    translations: {
      ja: {
        title: 'フィリピンが「高中所得国」入り：世界銀行認定、進出企業への意味',
        description:
          '2026年7月、世界銀行がフィリピンを高中所得国に格上げ。39年ぶりの区分変更の背景と、信用力向上・ODA減少という光と影、進出企業への示唆を解説します。',
        tags: ['高中所得国', '世界銀行', 'GNI', '投資環境', 'フィリピン進出'],
      },
      en: {
        title: "The Philippines Reaches 'Upper-Middle-Income' Status: What It Means",
        description:
          "In July 2026, the World Bank reclassified the Philippines as upper-middle income for the first time in 39 years. Here's the credit-profile upside, the ODA downside, and what it means for companies.",
        tags: ['Upper-middle income', 'World Bank', 'GNI', 'Investment climate', 'Philippines expansion'],
      },
    },
  },
  {
    slug: 'clark-aerodistrict-aerospace-hub-2026',
    publishedAt: new Date('2026-08-03T09:30:00'),
    category: 'infrastructure',
    region: 'clark',
    translations: {
      ja: {
        title: 'クラーク空港運営会社、759ヘクタールの航空都市「AeroDistrict」始動',
        description:
          '2026年7月、クラーク国際空港運営のLIPADが759ヘクタールの航空産業都市構想を発表。ルフトハンザ・テクニックのMRO拠点拡張とあわせて、日本企業への意味を解説します。',
        tags: ['クラーク国際空港', 'AeroDistrict', 'MRO', '航空産業', 'LIPAD'],
      },
      en: {
        title: "Clark Airport Operator Launches 759-Hectare 'AeroDistrict' Plan",
        description:
          "In July 2026, Clark International Airport operator LIPAD unveiled a 759-hectare aerospace district masterplan. Here's Lufthansa Technik's MRO expansion and what it means for Japanese companies.",
        tags: ['Clark International Airport', 'AeroDistrict', 'MRO', 'Aerospace industry', 'LIPAD'],
      },
    },
  },
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
