import { browser } from '$app/environment'
import type { ThemeType } from '$lib/types/types'
import { writable } from 'svelte/store'

const defaultTheme: ThemeType = 'auto'
const initialValue = (browser ? window.localStorage.getItem('theme') ?? defaultTheme : defaultTheme) as ThemeType

export const colorScheme = writable<ThemeType>(initialValue)

colorScheme.subscribe((value) => {
	if (!browser) return

	window.localStorage.setItem('theme', value)

	if (
		localStorage.theme === 'dark' ||
		(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
	) {
		document.documentElement.classList.add('dark')
	} else {
		document.documentElement.classList.remove('dark')
	}
})
