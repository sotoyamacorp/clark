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
2. `src/lib/articles.ts` の `articles` 配列に同じ内容(`slug` / `title` / `description` / `publishedAt` / `category` / `tags`)を追加する。トップページと `/articles` 一覧はこの配列を共通で参照しているため、mdxファイルだけでは一覧に出てこない。
3. `npm run build` → ローカルプレビューで確認 → コミット・push → `npx wrangler deploy`。

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
- 主要言語は日本語。将来的に英語版を追加する可能性を考慮し、URL構造は `/ja/`, `/en/` のような拡張がしやすい形にしておく。
- 記事ページはタイトル・description・OGP画像を必須項目とする。
- クラーク・パンパンガ・フィリピン進出などのキーワードを意識した構成にする。

## 注意事項
- サイトのコンテンツ(文体・トーン)は `../.claude/rules/content-style.md` に従う。
- 事業の背景情報が必要な場合は `../CLAUDE.md` と `../.claude/rules/business-context.md` を参照。
