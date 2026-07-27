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

## 現在のフェーズ
Phase 1 のみ実装済み（初期化・レイアウト・トップ/about/contact・SEO基本・Cloudflare Pages）。
Phase 2以降（content.config.ts、記事、データページ、シミュレーター）には未着手。
詳細は `サイト構築指示書_ClaudeCode用.md`（リポジトリルート）を参照。
