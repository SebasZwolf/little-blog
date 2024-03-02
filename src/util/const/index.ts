export const SITE_TITLE = 'Sebaz\' Blog';
export const SITE_DESCRIPTION = 'Blog de desarrollo de front end, guias simples de solución a problemas tipicos de desarrollo front end para principantes!';

export const screen_themes = {
	d : 'dark',
	l : 'light',
};


export const tags = {
	vue : {
		label : 'Vue.js',
		color : '#42b883',
	},
	react : {
		label : 'React.js',
		color : '#61dafb',
	},
	tailwind : {
		label : 'Tailwind CSS',
		color : '#38bdf8',
	},
	css3 : {
		label : 'CSS3',
		color : '#214ce5',
	},
	html5 : {
		label : 'HTML5',
		color : '#e44d26',
	},
	js : {
		label : 'JavaScript',
		color : '#f0dc4e',
	},
	ts : {
		label : 'TypeScript',
		color : '#3178c6',
	},
	astro : {
		label : 'Astro',
		color : 'var(--hierarchy-0)',
	},
	netlify : {
		label : 'Netlify',
		color : '#32e6e2',
	},
	static : {
		label : 'Static CMS',
		color : '#6ec5e3',
	},
	node : {
		label : 'NodeJS',
		color : '#339933',
	}
} as const satisfies Record<string, { label: string, color: string }> ;