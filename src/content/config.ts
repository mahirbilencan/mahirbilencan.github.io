import { defineCollection, z } from "astro:content";

const externalLink = z.string().url();

const publications = defineCollection({
	type: "content",
	schema: z.object({
		draft: z.boolean().default(false),
		title: z.string(),
		date: z.coerce.date(),
		authors: z.string().optional(),
		venue: z.string().optional(),
		status: z.enum(["preprint", "published", "in-prep"]).optional(),
		selected: z.boolean().default(false),
		links: z
			.object({
				pdf: externalLink.optional(),
				arxiv: externalLink.optional(),
				doi: z.string().optional(),
				code: externalLink.optional(),
				project: externalLink.optional(),
			})
			.optional(),
	}),
});

const talks = defineCollection({
	type: "content",
	schema: z.object({
		draft: z.boolean().default(false),
		title: z.string(),
		date: z.coerce.date(),
		event: z.string().optional(),
		location: z.string().optional(),
		kind: z.enum(["talk", "poster", "tutorial", "seminar"]).optional(),
		selected: z.boolean().default(false),
		links: z
			.object({
				slides: externalLink.optional(),
				video: externalLink.optional(),
			})
			.optional(),
	}),
});

const teaching = defineCollection({
	type: "content",
	schema: z.object({
		draft: z.boolean().default(false),
		course: z.string(),
		term: z.string(),
		institution: z.string().optional(),
		role: z.string().optional(),
		links: z
			.object({
				syllabus: externalLink.optional(),
				website: externalLink.optional(),
			})
			.optional(),
	}),
});

const projects = defineCollection({
	type: "content",
	schema: z.object({
		draft: z.boolean().default(false),
		title: z.string(),
		date: z.coerce.date().optional(),
		summary: z.string(),
		tags: z.array(z.string()).default([]),
		selected: z.boolean().default(false),
		links: z
			.object({
				code: externalLink.optional(),
				paper: externalLink.optional(),
				demo: externalLink.optional(),
			})
			.optional(),
	}),
});

const students = defineCollection({
	type: "content",
	schema: z.object({
		draft: z.boolean().default(false),
		name: z.string(),
		degree: z.string(),
		years: z.string(),
		status: z.enum(["current", "alumni"]),
		coAdvisor: z.string().optional(),
		thesis: z.string().optional(),
		currentPosition: z.string().optional(),
		note: z.string().optional(),
	}),
});

export const collections = { publications, talks, teaching, projects, students };
