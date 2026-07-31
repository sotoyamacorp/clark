import { siteConfig, siteText, founders } from './site-config';
import type { Locale } from './i18n';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function organizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteText[locale].name,
    url: siteConfig.url,
    description: siteText[locale].description,
    email: siteConfig.contactEmail,
    sameAs: [siteConfig.twitterUrl],
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorId?: string;
  url: string;
  image?: string;
  locale: Locale;
}

export function articleSchema(input: ArticleSchemaInput) {
  const author = founders.find((f) => f.id === input.authorId);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified ?? input.datePublished,
    url: input.url,
    ...(input.image ? { image: input.image } : {}),
    author: {
      '@type': 'Person',
      name: author?.name ?? siteText[input.locale].name,
      ...(siteConfig.twitterUrl ? { sameAs: [siteConfig.twitterUrl] } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: siteText[input.locale].name,
      url: siteConfig.url,
    },
  };
}

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export interface FaqItem {
  q: string;
  a: string;
}

// AIチャット等の回答エンジンに引用されやすくするためのFAQPage構造化データ。
// 記事frontmatterの faq 配列(存在する場合のみ)から生成する。
export function faqSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };
}
