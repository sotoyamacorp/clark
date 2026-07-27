import { siteConfig } from './site-config';

export function canonicalUrl(path: string, siteUrl: string | URL | undefined): string {
  const base = siteUrl ? siteUrl.toString() : siteConfig.url;
  return new URL(path, base).toString();
}
