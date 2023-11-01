import { browser } from '$app/environment'
import type { ThemeType } from '$lib/types/types'
import { writable } from 'svelte/store'

export const darkStore = writable(false)
darkStore.subscribe(() => {
	if (!browser) return

	const isDark = document.documentElement.classList.contains('dark')
	return isDark
})

const defaultTheme: ThemeType = 'auto'
const initialValue = (browser ? window.localStorage.getItem('theme') ?? defaultTheme : defaultTheme) as ThemeType

export const colorScheme = writable<ThemeType>(initialValue)

colorScheme.subscribe((value) => {
	if (browser) {
		window.localStorage.setItem('theme', value)

		const isDark =
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)

		if (isDark) {
			document.documentElement.classList.add('dark')
			darkStore.set(true)
		} else {
			document.documentElement.classList.remove('dark')
			darkStore.set(false)
		}
	}
})
