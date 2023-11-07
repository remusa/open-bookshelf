<script lang="ts">
	import { browser } from '$app/environment'
	import { page } from '$app/stores'
	import Titlebar from '$lib/components/Titlebar.svelte'
	import HeroiconsOutlineSun from '$lib/components/icons/HeroiconsOutlineSun.svelte'
	import logo from '$lib/images/svelte-logo.svg'
	import type { ThemeType } from '$lib/types/types'
	import { colorScheme } from '$lib/utils/dark-mode'
	import { shortcut } from '$lib/utils/shortcuts'
	import '../app.postcss'
	import type { LayoutData } from './$types'
	import HeroiconsOutlineDesktopComputer from './../lib/components/icons/HeroiconsOutlineDesktopComputer.svelte'
	import HeroiconsOutlineMoon from './../lib/components/icons/HeroiconsOutlineMoon.svelte'

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

<div class="flex flex-col w-full h-full">
	<Titlebar />

	<header class="flex justify-between">
		<div class="flex items-center justify-center p-2">
			<img class="w-[2em] h-[2em] object-contain" src={logo} alt="SvelteKit" />
		</div>

		<div class="flex items-center justify-center gap-1">
			{#if isDark}
				<button
					class="button"
					use:shortcut={{ code: 'KeyJ', control: true }}
					on:click={() => switchTheme('light')}
					title="Light mode"><HeroiconsOutlineSun /></button
				>
			{:else}
				<button
					class="button"
					use:shortcut={{ code: 'KeyJ', shift: true }}
					on:click={() => switchTheme('dark')}
					title="Dark mode"><HeroiconsOutlineMoon /></button
				>
			{/if}
			<button
				class="button"
				use:shortcut={{ code: 'KeyJ', alt: true }}
				class:active={$colorScheme === 'auto'}
				on:click={() => switchTheme('auto')}
				title="Auto"><HeroiconsOutlineDesktopComputer /></button
			>
		</div>
	</header>

	<section class="grid h-screen grid-cols-12 gap-2 p-4 grow border-y border-theme">
		<nav class="col-span-3">
			<ul class="px-4">
				{#each data.menu as route (route.title)}
					<li class="p-4 py-1 capitalize" aria-current={$page.url.pathname === route.path ? 'page' : undefined}>
						<a href={route.path}>{route.title}</a>
					</li>
				{/each}
			</ul>
		</nav>

		<main class="col-span-6 border-x border-theme">
			<div class="p-4">
				<slot />
			</div>
		</main>

		<aside class="col-span-3">
			<div class="p-4">Aside</div>
		</aside>
	</section>

	<footer class="flex justify-center w-full p-4">
		<p>Footer</p>
	</footer>
</div>

<style lang="postcss">
	.border-theme {
		@apply dark:border-gray-800 border-gray-950 text-black dark:text-white;
	}
	.button {
		@apply shadow border dark:border-gray-900 px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded;
	}
	.active {
	}
</style>
