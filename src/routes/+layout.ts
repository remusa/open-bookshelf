import type { BodyType } from '$lib/types/types'
import type { LayoutLoad } from './$types'

const modules = import.meta.glob('./**/*.svelte')

const body: BodyType[] = []

for (const path in modules) {
	const pathSanitized = path
		.replace('./', '/')
		.replaceAll('.svelte', '')
		.replaceAll('/+page', '')
		.replaceAll('/+layout', '')
	body.push({
		title: pathSanitized.substring(pathSanitized.lastIndexOf('/') + 1),
		path: pathSanitized.includes('index') ? pathSanitized.replace('index', '') : pathSanitized,
	})
}

export const load: LayoutLoad = async ({}) => {
	const menu = await Promise.all(body.filter((item) => item.title))
	return {
		menu,
	}
}

export const prerender = true

export const ssr = false
