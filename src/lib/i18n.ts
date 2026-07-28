export type Locale = 'ja' | 'en';

export const locales: Locale[] = ['ja', 'en'];
export const defaultLocale: Locale = 'ja';

export const ui = {
  ja: {
    nav: { articles: '記事', about: '私たちについて', contact: 'お問い合わせ', search: '検索' },
    footer: { navigation: 'Navigation', contact: 'Contact' },
    breadcrumb: { home: 'ホーム' },
    articleCard: { readMore: '記事を読む →' },
    filter: { all: 'すべて', label: '記事のカテゴリー絞り込み' },
    language: { switchTo: 'EN', current: '日本語' },
    search: { heading: 'サイト内検索', placeholder: 'キーワードを入力' },
    newsletter: {
      heading: '新着記事をメールで受け取る',
      description: '記事を公開するたびに、メールでお知らせします。いつでも配信停止できます。',
      emailPlaceholder: 'メールアドレス',
      submit: '登録する',
      comingSoon: 'メール配信の準備中です。近日公開予定です。',
    },
  },
  en: {
    nav: { articles: 'Articles', about: 'About Us', contact: 'Contact', search: 'Search' },
    footer: { navigation: 'Navigation', contact: 'Contact' },
    breadcrumb: { home: 'Home' },
    articleCard: { readMore: 'Read article →' },
    filter: { all: 'All', label: 'Filter articles by category' },
    language: { switchTo: '日本語', current: 'English' },
    search: { heading: 'Search the site', placeholder: 'Enter a keyword' },
    newsletter: {
      heading: 'Get new articles by email',
      description: "We'll email you whenever a new article is published. Unsubscribe anytime.",
      emailPlaceholder: 'Email address',
      submit: 'Subscribe',
      comingSoon: "Email updates are coming soon — we're still setting this up.",
    },
  },
} as const;

export function getLangFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  return maybeLocale === 'en' ? 'en' : 'ja';
}

export function useTranslations(locale: Locale) {
  return ui[locale];
}

// 現在のパス(例: "/about", "/articles/foo", "/")に対応する
// もう一方のロケールのパスを返す（言語切替リンク用）
export function getAlternatePath(pathname: string, currentLocale: Locale): string {
  if (currentLocale === 'en') {
    const stripped = pathname.replace(/^\/en\/?/, '/');
    return stripped.startsWith('/') ? stripped : `/${stripped}`;
  }
  return pathname === '/' ? '/en/' : `/en${pathname}`;
}

// ロケールを踏まえたリンク生成（日本語はプレフィックスなし、英語は /en プレフィックス）
export function localizedPath(path: string, locale: Locale): string {
  if (locale === 'ja') return path;
  if (path === '/') return '/en/';
  return `/en${path}`;
}
