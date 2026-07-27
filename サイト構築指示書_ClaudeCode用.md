# クラーク進出情報サイト｜構築指示書（Claude Code用）

Version 1.0 ／ 2026年7月27日
このファイルをリポジトリのルートに置き、Claude Code に読ませて着手してください。

---

## 0. このプロジェクトの前提（Claude Codeへ）

日本の中小企業がフィリピン・クラークへ進出する際の**一次情報データベース**を作ります。ブログメディアではありません。

守るべき原則：

1. **データが主役、記事は従。** トップページに記事一覧を置かない
2. **すべての数値は構造化データ（YAML）で一元管理**し、記事・表・シミュレーターがそれを参照する。数値を本文にハードコードしない
3. **数値には必ず出典・収集時期・最終確認日が付く。** これがサイトの信頼性そのもの
4. **運営者は週3時間しか使えない。** 更新の手間が増える実装は却下
5. **Phase 1は2日で公開する。** 作り込まない

---

## 1. 技術スタック

| 項目 | 選定 | 理由 |
|---|---|---|
| フレームワーク | **Astro 5.x** | 静的生成・高速・Content Layer がデータ駆動に最適 |
| コンテンツ | **MDX**（記事）＋ **YAML**（データ） | データと文章を分離 |
| UIフレームワーク | **Preact**（`@astrojs/preact`, compat有効） | シミュレーター用の島。React互換で約3KB |
| スタイル | **Tailwind CSS v4**（`@tailwindcss/vite`） | — |
| 型 | TypeScript strict | データスキーマの検証に必須 |
| ホスティング | **Cloudflare Pages** | 無料枠・高速・Functionsでフォーム処理可 |
| パッケージ管理 | pnpm | — |

> ⚠️ Astro 5 の Content Layer API（`src/content.config.ts`、`glob()` / `file()` ローダー、`render()` の import 元）はバージョンで変わります。実装前に必ず公式ドキュメントで最新の記法を確認してください。

### 導入するインテグレーション

```
@astrojs/mdx
@astrojs/sitemap
@astrojs/preact
@tailwindcss/vite
astro-og-canvas        # OGP画像の自動生成（Phase 3）
pagefind               # サイト内検索（Phase 3）
```

---

## 2. ディレクトリ構造

```
clark-site/
├── CLAUDE.md                      # 後述。Claude Code向けの常駐ルール
├── astro.config.mjs
├── tsconfig.json
├── package.json
│
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── downloads/                 # 白書PDF等
│   └── images/
│       ├── field/                 # 現地取材写真
│       └── team/
│
└── src/
    ├── content.config.ts          # ★全コレクションのスキーマ定義
    │
    ├── content/                   # 文章（MDX）
    │   ├── articles/              # 記事
    │   │   ├── clark-vs-manila-vs-cebu.mdx
    │   │   └── ...
    │   ├── guides/                # 制度ガイド（鮮度管理が別）
    │   │   ├── peza-cdc-boi.mdx
    │   │   └── ...
    │   └── reports/               # 現地レポート・インタビュー
    │       └── ...
    │
    ├── data/                      # ★数値データ（すべてYAML）
    │   ├── salaries.yaml          # 職種別給与相場
    │   ├── offices.yaml           # オフィスビル賃料
    │   ├── industrial-parks.yaml  # 工業団地
    │   ├── utilities.yaml         # インフラコスト
    │   ├── setup-costs.yaml       # 法人設立実費
    │   ├── living-costs.yaml      # 駐在員生活コスト
    │   ├── schools.yaml           # インター校
    │   ├── companies.yaml         # 進出日系企業
    │   └── config/
    │       ├── site.yaml          # サイト設定・為替レート
    │       └── employer-costs.yaml # 法定福利費率（要検証）
    │
    ├── components/
    │   ├── layout/                # Header, Footer, Breadcrumb, Nav
    │   ├── data/                  # DataTable, DataBadge, SourceNote, LastVerified
    │   ├── article/               # Toc, RelatedArticles, RelatedData, AuthorCard
    │   ├── cta/                   # WhitepaperCTA, ContactCTA, SimulatorCTA
    │   └── simulator/             # ★Preact島
    │       ├── CostSimulator.tsx
    │       ├── engine.ts          # 計算ロジック（純関数・テスト対象）
    │       └── types.ts
    │
    ├── layouts/
    │   ├── BaseLayout.astro
    │   ├── ArticleLayout.astro
    │   ├── GuideLayout.astro
    │   └── DataLayout.astro
    │
    ├── pages/
    │   ├── index.astro
    │   ├── about.astro            # 「私たちは誰か」★最重要
    │   ├── contact.astro
    │   ├── whitepaper.astro       # 白書DL
    │   ├── simulator.astro
    │   ├── data/
    │   │   ├── index.astro
    │   │   ├── salaries.astro
    │   │   ├── office-rent.astro
    │   │   ├── industrial-parks.astro
    │   │   ├── setup-cost.astro
    │   │   └── living-cost.astro
    │   ├── guides/
    │   │   ├── index.astro
    │   │   └── [...slug].astro
    │   ├── articles/
    │   │   ├── index.astro
    │   │   ├── [...slug].astro
    │   │   └── category/[category].astro
    │   ├── reports/
    │   │   ├── index.astro
    │   │   └── [...slug].astro
    │   ├── rss.xml.ts
    │   └── 404.astro
    │
    ├── lib/
    │   ├── currency.ts            # PHP→JPY換算（単一の入口）
    │   ├── schema.ts              # JSON-LD生成
    │   ├── seo.ts
    │   └── format.ts
    │
    └── styles/
        └── global.css
```

---

## 3. データスキーマ（最重要）

`src/content.config.ts` に全定義を置きます。**このスキーマがプロジェクトの背骨です。**

```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

/* ============================================
   共通の部品
   ============================================ */

// すべての数値データに必須のメタ情報
const provenance = {
  source: z.enum([
    'own-hiring',      // 自社・自グループの実採用実績（最強）
    'own-contract',    // 自社の実契約（賃料など）
    'interview',       // 進出企業への直接ヒアリング
    'partner-agency',  // 提携人材会社・不動産会社
    'job-posting',     // 求人票の実データ
    'official',        // CDC/PEZA等の公式資料
    'estimate',        // 推計（必ず算出根拠をnoteに書く）
  ]),
  sourceNote: z.string().optional(),
  sampleSize: z.number().int().positive().optional(),
  collectedAt: z.string().regex(/^\d{4}-\d{2}$/),   // YYYY-MM
  verifiedAt: z.string().regex(/^\d{4}-\d{2}$/),    // 最終確認
};

/* ============================================
   文章コレクション
   ============================================ */

const articleBase = {
  title: z.string().max(60),
  description: z.string().max(120),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  author: z.enum(['jio', 'hiro']),
  draft: z.boolean().default(false),
  cover: z.string().optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
  // 参照するデータセットID（内部リンクを自動生成するため）
  relatedData: z.array(z.enum([
    'salaries', 'offices', 'industrial-parks',
    'utilities', 'setup-costs', 'living-costs',
  ])).default([]),
  relatedSlugs: z.array(z.string()).default([]),
};

const articles = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/articles' }),
  schema: z.object({
    ...articleBase,
    category: z.enum([
      'compare',   // 比較・検討初期
      'cost',      // コスト
      'system',    // 制度
      'field',     // 現場
      'practice',  // 実務
    ]),
    tags: z.array(z.string()).default([]),
    // ★品質ゲート：一次情報を含むか
    hasPrimaryData: z.boolean(),
    hasFieldPhoto: z.boolean().default(false),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    ...articleBase,
    // 制度情報は鮮度が命。確認日と確認者を必須にする
    verifiedAt: z.coerce.date(),
    verifiedBy: z.string(),          // 例: "現地会計事務所 XX / Hiro"
    legalDisclaimer: z.boolean().default(true),
    order: z.number().int(),
  }),
});

const reports = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/reports' }),
  schema: z.object({
    ...articleBase,
    reportType: z.enum(['site-visit', 'interview', 'failure-case', 'rockwell-log']),
    visitedAt: z.coerce.date().optional(),
    companyProfile: z.object({     // 匿名化した企業プロフィール
      industry: z.string(),
      employeesJp: z.number().optional(),
      employeesPh: z.number().optional(),
      entryYear: z.number().optional(),
    }).optional(),
    photos: z.array(z.object({
      src: z.string(),
      caption: z.string(),
    })).default([]),
  }),
});

/* ============================================
   数値データコレクション
   ============================================ */

// --- 職種別給与相場 -------------------------
const salaries = defineCollection({
  loader: file('./src/data/salaries.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number().int(),
    category: z.enum([
      'it', 'bpo', 'manufacturing',
      'backoffice', 'management', 'support',
    ]),
    jobTitleJa: z.string(),
    jobTitleEn: z.string(),
    experience: z.enum(['entry', 'junior', 'mid', 'senior', 'lead']),
    // ★通貨は必ずPHPで保持。円換算は表示時のみ
    monthlyPhpMin: z.number().int(),
    monthlyPhpMedian: z.number().int(),
    monthlyPhpMax: z.number().int(),
    englishLevel: z.enum(['basic', 'business', 'fluent']).optional(),
    note: z.string().optional(),
    ...provenance,
  }),
});

// --- オフィス賃料 ---------------------------
const offices = defineCollection({
  loader: file('./src/data/offices.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number().int(),
    buildingName: z.string(),
    zone: z.string(),                       // 例: "Clark Freeport Zone / Berthaphil"
    grade: z.enum(['A', 'B', 'C']),
    rentPhpPerSqmMonth: z.number(),
    camPhpPerSqmMonth: z.number(),          // 共益費
    minAreaSqm: z.number().int(),
    minLeaseYears: z.number(),
    depositMonths: z.number(),
    fitOutFreeMonths: z.number().optional(),
    isPezaAccredited: z.boolean(),          // ★PEZA認定は意思決定に直結
    hasBackupPower: z.boolean(),
    internetProviders: z.array(z.string()),
    note: z.string().optional(),
    ...provenance,
  }),
});

// --- 工業団地 -------------------------------
const industrialParks = defineCollection({
  loader: file('./src/data/industrial-parks.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number().int(),
    name: z.string(),
    operator: z.string(),
    zoneType: z.enum(['CFZ', 'PEZA', 'CSEZ', 'other']),
    totalAreaHa: z.number().optional(),
    landRentPhpPerSqmMonth: z.number().optional(),
    factoryRentPhpPerSqmMonth: z.number().optional(),
    powerCapacityMw: z.number().optional(),
    distanceToAirportKm: z.number(),
    distanceToPortKm: z.number().optional(),
    japaneseTenants: z.number().int().optional(),
    incentives: z.array(z.string()).default([]),
    note: z.string().optional(),
    ...provenance,
  }),
});

// --- インフラ・光熱通信 ----------------------
const utilities = defineCollection({
  loader: file('./src/data/utilities.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number().int(),
    type: z.enum(['electricity', 'water', 'internet', 'mobile']),
    itemJa: z.string(),
    unitPhp: z.number(),
    unitLabel: z.string(),                 // 例: "PHP/kWh", "PHP/月 (100Mbps)"
    provider: z.string().optional(),
    outageHoursPerMonth: z.number().optional(),  // 停電実績
    note: z.string().optional(),
    ...provenance,
  }),
});

// --- 法人設立の実費 --------------------------
const setupCosts = defineCollection({
  loader: file('./src/data/setup-costs.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number().int(),
    entityType: z.enum(['domestic-corp', 'branch', 'rep-office', 'rhq']),
    step: z.string(),                      // 例: "SEC登記"
    stepOrder: z.number().int(),
    officialFeePhp: z.number(),
    professionalFeePhp: z.number().optional(),
    leadTimeDays: z.number().int(),
    isMandatory: z.boolean().default(true),
    note: z.string().optional(),
    ...provenance,
  }),
});

// --- 駐在員の生活コスト ----------------------
const livingCosts = defineCollection({
  loader: file('./src/data/living-costs.yaml'),
  schema: z.object({
    id: z.string(),
    year: z.number().int(),
    category: z.enum(['housing', 'food', 'education', 'transport', 'medical', 'other']),
    itemJa: z.string(),
    monthlyPhpMin: z.number(),
    monthlyPhpMax: z.number(),
    note: z.string().optional(),
    ...provenance,
  }),
});

export const collections = {
  articles, guides, reports,
  salaries, offices, industrialParks,
  utilities, setupCosts, livingCosts,
};
```

### データファイルの例

```yaml
# src/data/salaries.yaml
- id: it-dev-mid-2027
  year: 2027
  category: it
  jobTitleJa: ソフトウェアエンジニア
  jobTitleEn: Software Engineer
  experience: mid
  monthlyPhpMin: 45000
  monthlyPhpMedian: 60000
  monthlyPhpMax: 85000
  englishLevel: business
  source: partner-agency
  sourceNote: クラーク所在の人材紹介会社3社への実地ヒアリング
  sampleSize: 42
  collectedAt: "2027-01"
  verifiedAt: "2027-01"
  note: 経験3〜5年。React/Node.js等のモダンスタック経験者
```

> ⚠️ **上記の数値はすべてダミーです。** 実データはJio・Hiroが現地で収集して差し替えてください。ダミー値のまま公開しないよう、`source: estimate` かつ `sampleSize` 未設定のレコードはビルド時に警告を出す実装にします。

---

## 4. 為替と法定福利費の一元管理

```yaml
# src/data/config/site.yaml
exchangeRate:
  phpToJpy: 2.7          # ★手動更新。年2回でよい
  updatedAt: "2026-07"
  note: 表示用の概算レート
```

```ts
// src/lib/currency.ts
// PHP→JPY換算は必ずこの関数を通す。ページ内で直接掛け算しないこと。
export function phpToJpy(php: number): number { ... }
export function formatPhp(php: number): string { ... }
export function formatJpy(jpy: number): string { ... }
```

円表示の近くには必ず `<RateNote />` で「1PHP = X円で換算（2026年7月時点）」を出します。

```yaml
# src/data/config/employer-costs.yaml
# ⚠️ 以下はすべて仮の値。現地会計事務所の確認を経てから公開すること。
year: 2027
verifiedBy: "TODO: 現地会計事務所名を入れる"
thirteenthMonthRate: 0.0833      # 13ヶ月給与の月次引当
sssEmployerRate: 0.10            # 上限あり。要確認
philhealthEmployerRate: 0.025    # 要確認
pagibigEmployerFixedPhp: 200     # 要確認
leaveProvisionRate: 0.02
overheadRate: 0.05               # 健康診断・制服・研修等
```

---

## 5. コストシミュレーター仕様

サイト最大のフック。`/simulator` に配置し、Preact島（`client:visible`）で実装します。

### 入力

| 項目 | 形式 |
|---|---|
| 拠点タイプ | BPO／バックオフィス／IT開発／製造／コールセンター |
| 職種別人数 | 行を動的に追加（職種を`salaries`から選択＋人数＋経験レベル） |
| オフィス | グレード選択 or 面積を直接入力（1人あたり8㎡をデフォルト） |
| 日本人駐在員 | 人数（0で「駐在なし」） |
| 稼働開始 | 年月 |

### 出力

**初期費用**：法人設立（`setupCosts`）／内装・什器／IT機器／採用費／賃料デポジット／駐在員初期費用
**月額ランニング**：給与合計（`salaries`）／法定福利（`employer-costs`）／賃料＋共益費（`offices`）／光熱通信（`utilities`）／会計税務顧問／駐在員費用（`livingCosts`）

さらに3つを必ず表示：

1. **年間総額** と **1人あたり月額コスト**
2. **★日本で同じ体制を組んだ場合との比較**（日本の職種別人件費を`src/data/config/japan-benchmark.yaml`で持つ）── これが最も刺さる出力
3. 前提条件と出典の一覧（透明性が信頼を作る）

### リード獲得（最重要）

結果画面に **「この試算をPDFで受け取る」** ボタン。メールアドレス入力 → PDF送付 → リスト化。
**シミュレーターの目的は計算ではなく、メールアドレスの取得です。**

### 実装上の注意

- 計算ロジックは `engine.ts` に**純関数**として切り出し、UIから完全に分離する
- `engine.ts` には **Vitest でユニットテストを必ず書く**（数字が間違っていたら信頼を失う唯一の箇所）
- 入力状態をURLクエリに反映し、試算結果をURLで共有できるようにする
- データはビルド時にpropsで島に渡す（実行時fetchしない）

---

## 6. SEO実装要件

### 構造化データ（JSON-LD）

`src/lib/schema.ts` で生成。

| ページ | スキーマ |
|---|---|
| 全ページ | `BreadcrumbList` |
| トップ | `Organization`（住所・ロゴ・SNS） |
| 記事・ガイド・レポート | `Article`（`datePublished` / `dateModified` / `author`） |
| `faq`がある記事 | `FAQPage` |
| **データページ** | **`Dataset`** ★引用されやすくなる。必ず入れる |

### 必須実装

- `@astrojs/sitemap`／`robots.txt`／canonical／`lang="ja"`
- **全ページに「公開日」と「最終更新日」を表示**（ソース内だけでなく画面上に）
- ガイドには **「制度情報 最終確認日：YYYY-MM-DD」** をページ冒頭に表示
- OGP画像の自動生成（`astro-og-canvas`。タイトル＋カテゴリを描画）
- RSS（`/rss.xml`）
- 記事↔データの相互リンクを`relatedData`から自動生成
- 画像は `astro:assets` で最適化。すべてに`alt`必須

### 内部リンク設計

データページから記事へ、記事からデータページへ、双方向に自動リンクします。これによりサイト全体が「データを中心とした網」になり、回遊率と評価が上がります。

---

## 7. フォーム・メール取得

| Phase | 実装 |
|---|---|
| **1** | Tally または Google Form を埋め込む。**自前実装しない** |
| **2** | Cloudflare Pages Function → Google Sheets 追記 ＋ Resend で自動返信（白書PDFのリンク） |

必須項目：会社名／氏名／メール／業種／従業員数／検討フェーズ（情報収集・比較検討・具体化）
**検討フェーズは営業の優先順位付けに直結するので必ず取ってください。**

---

## 8. デザイン方針

読者は**50〜65歳の中小企業経営者**です。

- 落ち着いた配色（ネイビー基調＋アクセント1色）。スタートアップ風にしない
- **本文16px以上、行間1.8以上**
- 記事本文幅 720px、データ表はフル幅（横スクロール対応）
- フォント：Noto Sans JP ＋ システムフォント
- ダークモードは不要
- アニメーション・パララックス禁止
- **数値表は視認性が最優先**：ゼブラ、右寄せ、桁区切り、ソート可能、モバイルではカード表示に切替

---

## 9. 実装フェーズ

### Phase 1 — 2日で公開する

- [ ] Astro初期化、Tailwind、TypeScript strict
- [ ] BaseLayout / Header / Footer
- [ ] トップページ（メッセージ＋3つの導線のみ）
- [ ] **`/about`「私たちは誰か」**（最重要。顔写真・兄弟の経歴・現地との繋がり）
- [ ] `/contact`（Tally埋め込み）
- [ ] SEO基本（sitemap / robots / OGP静的 / canonical）
- [ ] Cloudflare Pagesへデプロイ

**この時点で記事は0本でよい。まず公開すること。**

### Phase 2 — 1〜2ヶ月目

- [ ] `content.config.ts` 全スキーマ実装
- [ ] 記事・ガイド・レポートの一覧／詳細
- [ ] `DataTable`コンポーネント（ソート・フィルタ・モバイルカード）
- [ ] データページ：給与・オフィス賃料
- [ ] 構造化データ（Article / FAQPage / Dataset / Breadcrumb）
- [ ] 白書DLページ
- [ ] RSS
- [ ] 記事20本投入

### Phase 3 — 3〜6ヶ月目

- [ ] **コストシミュレーター**（＋Vitestテスト）
- [ ] 残りのデータページ（工業団地・設立費用・生活コスト）
- [ ] Pagefindによるサイト内検索
- [ ] OGP自動生成
- [ ] Cloudflare Function でのフォーム処理＋自動返信
- [ ] 年次データの比較表示（2027 vs 2028）

---

## 10. 受け入れ基準

- Lighthouse：Performance 95以上／SEO 100／Accessibility 95以上
- `astro check` がエラー0
- ビルド時間 30秒以内（記事150本時点）
- `engine.ts` のテストカバレッジ 90%以上
- モバイルで全データ表が破綻せず読める
- **`source: estimate` かつ根拠note未記入のデータがあればビルド時に警告**

---

## 11. リポジトリに置く CLAUDE.md

以下をそのまま `CLAUDE.md` として保存してください。

```markdown
# クラーク進出情報サイト

## これは何か
日本の中小企業向け、フィリピン・クラーク進出の一次情報データベース。
ブログメディアではない。

## 絶対ルール
1. 数値を .astro / .mdx に直接書かない。必ず src/data/*.yaml に置き、参照する
2. 新しい数値データを追加するときは source / collectedAt / verifiedAt を必ず埋める
3. PHP→JPY換算は src/lib/currency.ts の関数を通す。直接掛け算しない
4. 記事は hasPrimaryData: true が原則。一般論だけの記事は追加しない
5. 制度ガイド（src/content/guides）は verifiedAt と verifiedBy が必須
6. 依存パッケージを増やす前に、標準機能で解けないか検討する
7. デザインの作り込みより、データの正確さと更新のしやすさを優先する

## 読者
50〜65歳の日本の中小企業経営者。専門用語には必ず注釈を。

## よく使うコマンド
pnpm dev / pnpm build / pnpm astro check / pnpm test

## 迷ったら
「運営者は週3時間しか使えない」を基準に判断する。
更新の手間が増える実装は採用しない。
```

---

## 12. 最初にClaude Codeへ出すプロンプト

```
このリポジトリで、CLAUDE.md と 構築指示書.md を読んでください。
Phase 1 のみを実装します。Phase 2 以降には手を付けないでください。

1. Astro 5 + TypeScript(strict) + Tailwind v4 + MDX + sitemap で初期化
2. BaseLayout, Header, Footer, Breadcrumb を実装
3. トップ / about / contact の3ページ
4. SEO基本（canonical, OGP, sitemap, robots.txt, Organization JSON-LD）
5. Cloudflare Pages 向けのビルド設定

デザインは最小限。50〜65歳が読みやすいことだけを満たしてください。
about ページの本文はプレースホルダーで構いませんが、
「兄弟の経歴」「現地との繋がり」「顔写真」のセクション構造は作ってください。

実装前に、Astro 5 の最新記法（content.config.ts の loader API など）を
公式ドキュメントで確認してください。
```

---

*※ 本書に記載した数値・料率・制度の記述はすべて仮置きです。公開前に現地の会計・法務専門家の確認を受けてください。*
