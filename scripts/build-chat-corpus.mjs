#!/usr/bin/env node
// AIチャットボットが回答時に参照する記事コーパスをビルド時に生成する。
// src/pages/(en/)articles/*.mdx を素材に、フロントマターと本文プレーンテキストを抽出し
// public/chat-corpus.json に書き出す(Workerがランタイムでこのファイルをfetchして検索する)。
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.resolve(fileURLToPath(import.meta.url), '../..');

function extractFrontmatterField(frontmatter, field) {
  const match = frontmatter.match(new RegExp(`^${field}:\\s*"([^"]*)"`, 'm'));
  return match ? match[1] : '';
}

function stripToPlainText(body) {
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[#>*_`|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function buildEntries(dir, locale, urlPrefix) {
  return readdirSync(dir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = readFileSync(path.join(dir, file), 'utf-8');
      const frontmatterMatch = raw.match(/^---\n([\s\S]*?)\n---/);
      const frontmatter = frontmatterMatch ? frontmatterMatch[1] : '';
      const body = frontmatterMatch ? raw.slice(frontmatterMatch[0].length) : raw;

      return {
        slug,
        locale,
        title: extractFrontmatterField(frontmatter, 'title'),
        description: extractFrontmatterField(frontmatter, 'description'),
        url: `${urlPrefix}/${slug}/`,
        // プロンプトに含めるコンテキスト量を抑えるため記事あたりの文字数を制限する
        text: stripToPlainText(body).slice(0, 4000),
      };
    });
}

const entries = [
  ...buildEntries(path.join(rootDir, 'src/pages/articles'), 'ja', '/articles'),
  ...buildEntries(path.join(rootDir, 'src/pages/en/articles'), 'en', '/en/articles'),
];

writeFileSync(path.join(rootDir, 'public/chat-corpus.json'), JSON.stringify(entries), 'utf-8');

console.log(`chat-corpus.json generated: ${entries.length} entries`);
