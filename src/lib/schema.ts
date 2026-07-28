import { siteConfig, founders } from './site-config';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    email: siteConfig.contactEmail,
    sameAs: [siteConfig.twitterUrl],
  };
}

export interface ArticleSchemaInput {
  headline: string;
  description: string;
  datePublished: string;
  authorId?: string;
  url: string;
  image?: string;
}

export function articleSchema(input: ArticleSchemaInput) {
  const author = founders.find((f) => f.id === input.authorId);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.datePublished,
    url: input.url,
    ...(input.image ? { image: input.image } : {}),
    author: {
      '@type': 'Person',
      name: author?.name ?? siteConfig.name,
      ...(siteConfig.twitterUrl ? { sameAs: [siteConfig.twitterUrl] } : {}),
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
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
