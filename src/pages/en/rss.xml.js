import rss from '@astrojs/rss';
import { sortedArticles } from '../../lib/articles';
import { siteText } from '../../lib/site-config';

export async function GET(context) {
  const locale = 'en';

  return rss({
    title: siteText[locale].name,
    description: siteText[locale].description,
    site: context.site,
    items: sortedArticles.map((post) => ({
      title: post.translations[locale].title,
      description: post.translations[locale].description,
      pubDate: post.publishedAt,
      link: `/en/articles/${post.slug}/`,
      categories: post.translations[locale].tags,
    })),
    customData: '<language>en</language>',
  });
}
