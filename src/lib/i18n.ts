export type Locale = 'ja' | 'en';

export const locales: Locale[] = ['ja', 'en'];
export const defaultLocale: Locale = 'ja';

export const ui = {
  ja: {
    nav: { articles: '記事', about: '私たち/クラークについて', contact: 'お問い合わせ', search: '検索', glossary: '用語集' },
    footer: { navigation: 'Navigation', contact: 'Contact' },
    breadcrumb: { home: 'ホーム' },
    articleCard: { readMore: '記事を読む →', publishedToday: '🆕 本日公開', underReview: '🚧 レビュー中' },
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
    chat: {
      launcherLabel: 'AIチャットに質問する',
      heading: 'AIチャット',
      subheading: 'サイトの記事内容をもとにお答えします',
      gateDescription:
        'ご利用にはメールアドレスのご入力をお願いしています(ニュースレターと同じ購読リストに登録され、いつでも配信停止できます)。',
      emailPlaceholder: 'メールアドレス',
      startButton: 'チャットを始める',
      inputPlaceholder: '質問を入力してください',
      send: '送信',
      thinking: '回答を作成しています…',
      errorMessage: 'エラーが発生しました。しばらくしてからもう一度お試しください。',
      invalidEmail: 'メールアドレスの形式をご確認ください。',
      sourcesLabel: '参考記事',
      disclaimer: 'AIによる自動回答のため、内容の正確性は記事本文でご確認ください。',
      close: '閉じる',
    },
  },
  en: {
    nav: { articles: 'Articles', about: 'About Us & Clark', contact: 'Contact', search: 'Search', glossary: 'Glossary' },
    footer: { navigation: 'Navigation', contact: 'Contact' },
    breadcrumb: { home: 'Home' },
    articleCard: { readMore: 'Read article →', publishedToday: '🆕 Published today', underReview: '🚧 Under review' },
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
    chat: {
      launcherLabel: 'Ask the AI chatbot',
      heading: 'AI Chat',
      subheading: 'Answers are based on the articles on this site',
      gateDescription:
        "Please enter your email to use this chat (you'll be added to the same list as our newsletter — unsubscribe anytime).",
      emailPlaceholder: 'Email address',
      startButton: 'Start chatting',
      inputPlaceholder: 'Type your question',
      send: 'Send',
      thinking: 'Thinking…',
      errorMessage: 'Something went wrong. Please try again in a moment.',
      invalidEmail: 'Please check your email address.',
      sourcesLabel: 'Related articles',
      disclaimer: 'This is an automated AI response — please verify details against the article itself.',
      close: 'Close',
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
