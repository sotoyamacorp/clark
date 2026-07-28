# clark-site 技術ガイド

このディレクトリはフィリピン・クラーク発信用Webサイトのコード本体。事業の背景は `../CLAUDE.md` を参照。ここではサイトの技術的な指示のみを扱う。

## 技術スタック(仮・要決定)
- フレームワーク: 未定(候補: Next.js + Markdown / Astro など、静的生成向きのものを想定)
- ホスティング: 未定(候補: Vercel)
- スタイル: 未定(候補: Tailwind CSS)

> 実装開始時にJioが決定した内容へ、このセクションを上書きすること。

## ディレクトリ構成(想定)
```
clark-site/
├── CLAUDE.md
├── src/            # サイトのソースコード
├── content/        # ビルドに取り込む記事(articles/ からの反映先、または直接参照)
├── public/          # 画像等の静的アセット
└── package.json
```

## 記事フォーマット・反映の手順

新規記事は `src/pages/articles/clark-history-and-value.mdx` を**フォーマットのテンプレート**として使うこと。今後追加する記事もこの構成に揃える。

### テンプレートの構成要素
1. フロントマター: `layout: ../../layouts/BaseLayout.astro` / `title` / `description` / `publishedAt` / `author` / `category` / `tags`
2. 本文全体を `<div class="max-w-3xl mx-auto px-4 py-12">` で囲む
3. 構成順序:
   - `# タイトル`(h1)
   - `## はじめに`(読者の疑問・課題を一文で提示する導入)
   - `## この記事で分かる◯つのポイント`(番号付きボックスで要点を先出し。`bg-navy-50 border border-navy-200 rounded-lg p-8` + 丸数字アイコン)
   - 本文セクション(`##`見出し。装飾ボックスは `border-l-4 border-accent-500 bg-white p-6 shadow-sm` などで要点を視覚的に区切る)
   - `## まとめ`(次に取るべきステップを番号付きで提示。`bg-navy-900 text-white p-10 rounded-xl` のボックス)
   - `## 出典・参考情報`(箇条書き、末尾に「記事公開日：」を明記)

### 新規記事を追加する手順
1. `src/pages/articles/` に新しい `.mdx` ファイルを作成し、上記テンプレートに沿って執筆する(出典は必ず最低3つ、`content-style.md`のトーンに従う)。
2. `src/lib/articles.ts` の `articles` 配列に**日本語・英語両方の翻訳データ**(`translations.ja` / `translations.en` に `title` / `description` / `tags`)を追加する。トップページと `/articles` 一覧はこの配列を共通で参照しているため、mdxファイルだけでは一覧に出てこない。`region` は `'clark'`(クラーク特化)か `'philippines'`(フィリピン全体のテーマ)のいずれかを必ず指定する(記事カードの地域バッジとフィルタータブ表示に使われる)。
3. **英語版記事を作成する**(下記「多言語対応(i18n)」参照)。`src/pages/en/articles/{slug}.mdx` に、直訳ではなく自然な英語で執筆する。
4. **OG画像を生成する**(下記「OG画像の生成方法」参照)。生成したPNGを `public/og/{slug}.png` に配置し、記事フロントマターに `ogImage: "/og/{slug}.png"` を追加する。省略した場合は `public/og/og-default.png` にフォールバックするが、記事ごとの専用画像を作るのが望ましい(SNSシェア時のプレビューに直結するため)。
5. `npm run build` → ローカルプレビューで確認 → コミット・push → `npx wrangler deploy`。

### OG画像の生成方法
新規npm依存を増やさず、ローカルのChromeヘッドレスでHTML→PNGを生成する方式を採用している(satoriやastro-og-canvas等は未導入)。
1. `/tmp`等の作業ディレクトリに、ブランドカラー(`bg-navy-950`グラデーション + `accent-500`のゴールド)でタイトルを配置したHTMLファイルを作成する。1200x630サイズ、"PH"バッジ+サイト名+記事タイトル+`ph.sotoyamacorp.com`の構成が基本形(既存の`public/og/*.png`を参考にする)。
2. 以下のコマンドでPNG化する:
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu --no-sandbox \
     --window-size=1200,630 --hide-scrollbars --force-device-scale-factor=1 \
     --screenshot="出力先.png" "file:///作業ディレクトリ/対象.html"
   ```
3. 生成した画像を確認(Readツールで開いて視認)した上で `public/og/{slug}.png` に配置する。

### 過去にハマった落とし穴
- **色クラスは `src/styles/global.css` の `@theme` に定義されたトークンのみ使用可能**(navy: 50/100/200/600/700/800/900/950、accent: 50/100/500/600/700)。定義されていない濃淡(例: `navy-500`, `accent-800`)を指定すると何のCSSも生成されず、意図した色が当たらない「見えないバグ」になる。
- **本文・出典中にリンクを貼る場合は色とunderlineを明示すること**(例: `class="text-accent-700 underline hover:text-accent-500"`)。サイト共通のリセット(`a { color: inherit; text-decoration: inherit }`)により、クラス無指定だと地の文と同化して見えなくなる。外部サイトへのリンクは `target="_blank" rel="noopener noreferrer"` を付ける。
- **紺色背景(`bg-navy-950` / `bg-navy-900`)の上で使う見出し・テキストは白系の色クラス(`text-white` / `text-navy-200`)を明示すること**。見出し(h1〜h4)のデフォルト色は `@layer base` で定義されており、ユーティリティクラスで上書きされる前提になっている。
- **丸数字バッジ(`w-10 h-10 bg-accent-500 rounded-full`等)とテキストを横並びにする `flex` コンテナには、必ず `items-center` を付けること**。付け忘れるとバッジがテキストブロックの上寄りにズレて見える。テンプレート内の該当箇所(3つのポイントボックス・まとめステップボックス)はすべて `flex items-center gap-4` で統一済み。
- **記事(.mdx)のtitle/description/publishedAt/authorは、BaseLayout側で `Astro.props.frontmatter ?? Astro.props` として両対応済み**(MDXの`layout:`フロントマターは`Astro.props.frontmatter`にネストされる仕様のため)。`publishedAt`が存在する場合は自動でArticle構造化データ(JSON-LD)が出力される。BaseLayoutの props 受け取り方を変更する際は、この両対応ロジックを壊さないよう注意。

## ビルド・デプロイ(叩き台)
```bash
npm install
npm run dev      # ローカル確認
npm run build    # 本番ビルド
npm run deploy   # デプロイ(ホスティング先決定後に確定)
```

## SEO・多言語方針
- 記事ページはタイトル・description・OGP画像を必須項目とする。
- クラーク・パンパンガ・フィリピン進出などのキーワードを意識した構成にする。

## 多言語対応(i18n)

2026-07-28にJioの依頼で導入。読者はフィリピン人にもこの取り組みを理解してもらえるよう、手動で言語切替できる構成にしている。

### アーキテクチャ
- Astro標準の `i18n` ルーティング(`astro.config.mjs`)を使用。`locales: ['ja', 'en']`、`defaultLocale: 'ja'`、`prefixDefaultLocale: false`。
- **日本語はプレフィックスなし**(`/`, `/about` など、既存URLのまま変更なし)。**英語は `/en/` 配下**(`/en/`, `/en/about` など)。日本語ページのURLは一切変えていない(SEO上の既存評価を壊さないため)。
- `src/lib/i18n.ts`: ロケール型定義・UI文字列辞書(`ui.ja` / `ui.en`)・ロケール判定(`getLangFromUrl`)・言語切替リンク生成(`getAlternatePath`)・ロケール別パス生成(`localizedPath`)を集約。
- `src/lib/site-config.ts`: `siteConfig`(ロケール非依存の固定値)と `siteText`(ロケール別のサイト名・タグライン・説明文)を分離。`founders` の `role` / `bio` も `Record<Locale, string>` 化。
- `src/lib/articles.ts`: 記事データは `translations.ja` / `translations.en` にタイトル・description・タグを持つ。`region`/`category`/`publishedAt`/`slug` はロケール非依存。`regionLabels` / `categoryLabels` もロケール別。
- `BaseLayout.astro` が `Astro.url` からロケールを判定し、`<html lang>`・hreflang代替リンク(ja/en/x-default)・OGP・構造化データ(Organization/Article)をすべてロケール別に出力する。
- `ArticleCard.astro` / `ArticleFilterTabs.astro` は `locale` propを必須で受け取る。ページ側で呼び出す際は必ず指定すること。
- `Header.astro` に言語切り替えリンクを設置。現在のパスに対応するもう一方のロケールのパスへ遷移する(`getAlternatePath`で計算。単に `/en/` に飛ばすのではなく、記事ページなら英語版の同じ記事に飛ぶ)。

### 新規ページ・コンポーネントを追加するときの注意
- ページ文言をハードコードする場合、`src/pages/{page}.astro`(日本語)と `src/pages/en/{page}.astro`(英語)の両方を作成する。
- 記事は直訳ではなく、**フィリピン人の読者が自然に読める英語**で書く(日本語→英語の逐語訳にしない。文の構造から書き直す)。数値・固有名詞・出典URLなどのファクトは正確に保つこと。
- 新しいUI文字列(ボタン名等)は `src/lib/i18n.ts` の `ui` に追加し、ページ固有の長文コンテンツ(見出し・本文)は各ページファイルに直接ロケール別に書く(サイト全体の巨大な辞書ファイルは作らない、既存パターンを踏襲)。

## 注意事項
- サイトのコンテンツ(文体・トーン)は `../.claude/rules/content-style.md` に従う。
- 事業の背景情報が必要な場合は `../CLAUDE.md` と `../.claude/rules/business-context.md` を参照。
