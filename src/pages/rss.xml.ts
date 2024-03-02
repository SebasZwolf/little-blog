import rss, { pagesGlobToRssItems } from '@astrojs/rss';
import { type APIRoute } from 'astro';
import { getCollection } from 'astro:content';


export const GET: APIRoute = async function (context) {
  const blog = await getCollection('blog');
	return rss({
		title: 'Sebaz\' Blog - tutoriales',
		description: 'blog personal de consejos y tutoriales dentro del mundo de desarrollo front-end y (a veces) programación',
		site: context.site!,
		items: blog.map(p => ({
      title: p.data.title,
      pubDate: p.data.datePub,
      description: p.data.desc,
      link: `${context.site!}/blog/${p.slug}/`,
    })),
		customData: `<language>es-pe</language>`,
	});
};