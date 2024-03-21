import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
	site : process.env.URL ?? 'https://SebasZwolf.github.io',
	base : process.env.BASE ?? '/wider-blog',
	integrations: [
		sitemap()
	],
});
