import { dev } from '$app/environment'
import { settingsStore } from '$lib/utils/settings'
import type { PageLoad } from './$types'

export const csr = dev

export const prerender = true

export const ssr = false

export const load: PageLoad = async () => {
	// const stores = await import('$lib/utils/stores')
	// const settings = (await stores.settingsStore.get('settings')) as SettingsType
	const settings = Object.fromEntries(await settingsStore.entries())
	return {
		settings,
	}
}
