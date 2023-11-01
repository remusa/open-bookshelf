<script lang="ts">
	import { page } from '$app/stores'
	import logo from '$lib/images/svelte-logo.svg'
	import '../app.postcss'
	import type { LayoutData } from './$types'

	export let data: LayoutData

	const routes = [
		{ path: '/reading', title: 'reading' },
		{ path: '/finished', title: 'finished' },
		{ path: '/discover', title: 'discover' },
	]
</script>

<div class="flex flex-col w-full h-full">
	<header class="flex justify-between p-4 px-4">
		<div class="flex items-center justify-center">
			<img class="w-[2em] h-[2em] object-contain" src={logo} alt="SvelteKit" />
		</div>

		<div class="flex items-center justify-center">
			<button class="px-2 py-1">Dark</button>
			<button class="px-2 py-1">Light</button>
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

				{#each routes as route}
				<li class="px-2 py-1 capitalize" aria-current={$page.url.pathname === 'reading' ? 'page' : undefined}>
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
