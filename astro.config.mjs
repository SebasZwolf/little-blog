import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://SebasZwolf.github.io',
	base : '/little-blog',
	integrations: [
		sitemap()
	],
});
