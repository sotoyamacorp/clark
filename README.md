# クラーク通信

フィリピン・クラークに関するあらゆる情報を扱う一次情報メディア。
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

**https://ph.sotoyamacorp.com**（`sotoyamacorp.com` のサブドメイン）。
将来クラーク以外の地域を追加する場合も、サブドメインではなくこのドメイン配下のパス（`/clark`, `/manila` など）で分ける方針。
`sotoyamacorp.com` のDNSはCloudflareで管理しており、Google Workspace（メール）用のMX/TXTレコードもCloudflare側に移行済み。

## デプロイ（Cloudflare Workers + 静的アセット）

完全な静的サイト（SSRなし）を、Cloudflare Workersの静的アセット配信機能でホストしています。設定は`wrangler.jsonc`。

```
pnpm build
pnpm wrangler deploy
```

初回セットアップの流れ（記録用）：
1. GitHubリポジトリ: `sotoyamacorp/clark`
2. `pnpm wrangler login` でCloudflareアカウントに認証
3. `wrangler.jsonc` の `assets.directory` が `./dist` を指すようにして `pnpm wrangler deploy`
4. Cloudflareダッシュボード → 対象Worker（`clark`）→ Domains → Add Domain → `ph.sotoyamacorp.com`
   （そのためには`sotoyamacorp.com`がCloudflareのゾーンとしてActiveである必要がある）

Gitプッシュ時の自動デプロイは未設定（現状は手動で`pnpm wrangler deploy`）。継続的デプロイが必要になったら、Cloudflareダッシュボードの「Workers Builds」でこのリポジトリを連携する。

## 公開前に必ず変更すること

- `src/lib/site-config.ts` の `contactEmail`（実際に使うアドレスに）／`tallyFormUrl`／`founders`（プレースホルダーのまま公開しない）
- `/about` の本文・顔写真
