import { defineCollection, z } from 'astro:content';

import { tags } from '../util/const'

type k_tags = keyof typeof tags;
const tagarr = new Set(Object.keys(tags)) as Set<k_tags>;

const blog = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		datePub: z.coerce.date(),
		dateUpd: z.coerce.date().optional(),
		thumbnail: z.object({
			img: image(),
			alt: z.string(),
		}).optional(),
		tags : z.string()
			.refine(e => tagarr.has(e as k_tags), e => ({ message : `'${e}' tag not recognized` }))
			.array().transform(arr => arr.map(e => [e, tags[e as k_tags]] as [k_tags, typeof tags[k_tags]]))
	})
});

export const collections = { blog };
