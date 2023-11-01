import { z } from 'zod'

const bookSchema = z.object({
	title: z.string(),
	author: z.string(),
	coverImageUrl: z.string(),
	id: z.string(),
	pageCount: z.number(),
	publisher: z.string(),
	language: z.string(),
	synopsis: z.string(),
	categories: z.array(z.string()),
	tags: z.array(z.string()),
})
export type BookType = z.infer<typeof bookSchema>
