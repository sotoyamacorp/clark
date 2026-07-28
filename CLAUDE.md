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

## 記事反映の手順(叩き台)
1. `../articles/` に新規記事(Markdown)を追加・編集する。
2. 記事はフロントマターに `title` / `date` / `status`(draft/published) を持たせる。
3. `status: published` の記事のみサイトのビルド対象に含める。
4. ビルドコマンド実行 → ローカルプレビューで確認 → デプロイ。

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
