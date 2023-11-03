import { z } from 'zod'

const themeSchema = z.enum(['light', 'dark', 'auto'])
export type ThemeType = z.infer<typeof themeSchema>

const statusSchema = z.enum(['reading', 'finished', 're-reading', 'abandoned', 'on-hold', 'abandoned'])
export type StatusType = z.infer<typeof statusSchema>

export const authorSchema = z.object({
	id: z.number(),
	uuid: z.string().uuid(),
	name: z.string(),
})

export const tagSchema = z.object({
	id: z.number(),
	uuid: z.string().uuid(),
	name: z.string(),
})
export type TagType = z.infer<typeof tagSchema>

export const categorySchema = z.enum(['productivity', 'fiction'])
export type CategoryType = z.infer<typeof categorySchema>

export const bookSchema = z.object({
	id: z.number(),
	uuid: z.string().uuid(),
	isbn: z.string(),
	title: z.string(),
	authors: z.array(authorSchema),
	coverImageUrl: z.string(),
	pageCount: z.number(),
	publisher: z.string(),
	language: z.string(),
	description: z.string(),
	categories: z.array(categorySchema),
	tags: z.array(tagSchema),
	publishDate: z.date(),
	createdBy: z.string(),
	updatedBy: z.string(),
	status: statusSchema,
})
export type BookType = z.infer<typeof bookSchema>
