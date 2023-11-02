<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import HeroiconsOutlineSun from '$lib/components/icons/HeroiconsOutlineSun.svelte'
	import logo from '$lib/images/svelte-logo.svg'
	import type { ThemeType } from '$lib/types/types'
	import { appWindow } from '@tauri-apps/api/window'
	import { onMount } from 'svelte'
	import '../app.postcss'
	import type { LayoutData } from './$types'
	import HeroiconsOutlineDesktopComputer from './../lib/components/icons/HeroiconsOutlineDesktopComputer.svelte'
	import HeroiconsOutlineMoon from './../lib/components/icons/HeroiconsOutlineMoon.svelte'

	onMount(() => {
		if (!browser) return

		document?.querySelector('#titlebar-minimize')?.addEventListener('click', () => appWindow.minimize())
		document?.querySelector('#titlebar-maximize')?.addEventListener('click', () => appWindow.toggleMaximize())
		document?.querySelector('#titlebar-close')?.addEventListener('click', () => appWindow.close())
	})

	export let data: LayoutData

	function getIsDark() {
		return (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		)
	}

	function toggleDarkMode(darkMode: boolean) {
		if (darkMode) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	let isDark = getIsDark()

	if (browser) {
		toggleDarkMode(isDark)
	}

	function switchTheme(theme: ThemeType) {
		localStorage.setItem('theme', theme)
		isDark = getIsDark()
		toggleDarkMode(isDark)
	}
</script>

<div
	data-tauri-drag-region
	class="h-8 bg-gray-100 dark:bg-gray-800 select-none flex justify-end fixed top-0 left-0 right-0 mb-8"
>
	<button class="titlebar-button" id="titlebar-minimize">
		<img src="https://api.iconify.design/mdi:window-minimize.svg" alt="minimize" />
	</button>
	<button class="titlebar-button" id="titlebar-maximize">
		<img src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" />
	</button>
	<button class="titlebar-button hover:bg-red-500 dark:hover:bg-red-400" id="titlebar-close">
		<img src="https://api.iconify.design/mdi:close.svg" alt="close" />
	</button>
</div>

<div class="flex flex-col w-full h-full">
	<header class="flex justify-between p-4 px-4">
		<div class="flex items-center justify-center">
			<img class="w-[2em] h-[2em] object-contain" src={logo} alt="SvelteKit" />
		</div>

		<div class="flex items-center justify-center">
			{#if isDark}
				<button class="button" on:click={() => switchTheme('light')} title="Light mode"><HeroiconsOutlineSun /></button>
			{:else}
				<button class="button" on:click={() => switchTheme('dark')} title="Dark mode"><HeroiconsOutlineMoon /></button>
			{/if}
			<button class="button" on:click={() => switchTheme('auto')} title="Auto"
				><HeroiconsOutlineDesktopComputer /></button
			>
		</div>
	</header>

	<section class="flex flex-row w-screen border border-red grow">
		<nav class="flex justify-center w-2/12 p-6 bg-green-50">
			<ul>
				{#each data.menu as route}
					<li class="px-2 py-1 capitalize" aria-current={$page.url.pathname === route.path ? 'page' : undefined}>
						<a href={route.path}>{route.title}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<main class="p-6 bg-gray-400 grow">
			<slot />
		</main>

		<aside class="w-2/12 p-6 bg-gray-700">Aside</aside>
	</section>

	<footer class="flex justify-center w-full p-6">
		<p>Footer</p>
	</footer>
</div>

<style lang="postcss">
	.button {
		@apply shadow border dark:border-gray-900 px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded;
	}

	.titlebar-button {
		@apply inline-flex justify-center items-center w-8 h-8 hover:bg-gray-400;
	}
</style>
