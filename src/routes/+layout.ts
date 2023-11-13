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
		.replaceAll('-', ' ')
	body.push({
		title: pathSanitized.substring(pathSanitized.lastIndexOf('/') + 1),
		path: pathSanitized.includes('index') ? pathSanitized.replace('index', '') : pathSanitized,
	})
}

export const load: LayoutLoad = async () => {
	const menu = await Promise.all(body.filter((item) => item.title))
	return {
		menu,
	}
}

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true

export const ssr = false

export const trailingSlash = 'always'

// we don't need any JS on this page, though we'll load
// it in dev so that we get hot module replacement
// export const csr = dev
