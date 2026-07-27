# クラーク進出情報サイト

日本の中小企業向け、フィリピン・クラーク進出の一次情報データベース。
詳細な方針は [`サイト構築指示書_ClaudeCode用.md`](./サイト構築指示書_ClaudeCode用.md) と [`CLAUDE.md`](./CLAUDE.md) を参照。

現在は **Phase 1**（初期公開）のみ実装済みです。

## コマンド

| コマンド | 内容 |
|---|---|
| `pnpm dev` | 開発サーバー起動（`localhost:4321`） |
| `pnpm build` | 本番ビルド（`./dist/` に出力） |
| `pnpm preview` | ビルド結果をローカルで確認 |
| `pnpm astro check` | 型チェック |

## 公開ドメイン

`ph.sotoyamacorp.com`（`sotoyamacorp.com` のサブドメイン）。
将来クラーク以外の地域を追加する場合も、サブドメインではなくこのドメイン配下のパス（`/clark`, `/manila` など）で分ける方針。
ルートドメイン（`sotoyamacorp.com`）のGoogle Workspace（メール）の設定には影響しない。

## Cloudflare Pages へのデプロイ

Phase 1 は完全な静的サイト（SSRなし）なので、アダプタなしでそのまま Cloudflare Pages にデプロイできます。

1. GitHubにこのリポジトリをpush
2. Cloudflare Pages のダッシュボードで新規プロジェクトを作成し、そのリポジトリを連携
3. 以下のビルド設定を入力

   | 設定項目 | 値 |
   |---|---|
   | Framework preset | Astro |
   | Build command | `pnpm build` |
   | Build output directory | `dist` |
   | Root directory | （空欄。このリポジトリのルート自体がAstroプロジェクト） |
   | Node version | 22 以上（`package.json` の `engines` を参照） |

4. Pagesの「カスタムドメイン」で `ph.sotoyamacorp.com` を追加
5. Cloudflareが提示するCNAMEターゲット（`◯◯.pages.dev`）を、`sotoyamacorp.com` のDNSを管理している場所（お名前.comなど）で `ph` のCNAMEレコードとして追加

Phase 2 でフォーム処理用の Cloudflare Pages Functions を追加する際は、`functions/` ディレクトリを追加し、アダプタ変更が必要かどうかを都度検討してください（現時点では不要）。

## 公開前に必ず変更すること

- `src/lib/site-config.ts` の `contactEmail`（実際に使うアドレスに）／`tallyFormUrl`／`founders`（プレースホルダーのまま公開しない）
- `/about` の本文・顔写真
