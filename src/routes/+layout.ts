import { z } from 'zod'
import type { LayoutLoad } from './$types'

export const prerender = true
export const ssr = false

const modules = import.meta.glob('./**/*.svelte')

const bodySchema = z.object({
	title: z.string(),
	path: z.string(),
})

type BodyType = z.infer<typeof bodySchema>

const body: BodyType[] = []

for (let path in modules) {
	let pathSanitized = path.replace('.svelte', '').replace('./', '/').replaceAll('/+page', '')
	body.push({
		title: pathSanitized.substring(pathSanitized.lastIndexOf('/') + 1),
		path: pathSanitized.includes('index') ? pathSanitized.replace('index', '') : pathSanitized,
	})
}

body[0].title = 'home'
body[0].path = '/'

export const load: LayoutLoad = async ({}) => {
	const menu = await Promise.all(body.filter((item) => item.title))
	return {
		menu,
	}
}
