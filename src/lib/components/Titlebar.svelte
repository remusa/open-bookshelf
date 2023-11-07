<script lang="ts">
	import { browser } from '$app/environment'
	import { appWindow } from '@tauri-apps/api/window'
	import { onMount } from 'svelte'

	onMount(() => {
		if (browser) {
			document?.querySelector('#titlebar-minimize')?.addEventListener('click', () => appWindow.minimize())
			document?.querySelector('#titlebar-maximize')?.addEventListener('click', () => appWindow.toggleMaximize())
			document?.querySelector('#titlebar-close')?.addEventListener('click', () => appWindow.close())
		}
	})
</script>

<div data-tauri-drag-region class="flex justify-end h-8 bg-gray-100 select-none dark:bg-gray-950">
	<button class="titlebar-button" id="titlebar-minimize">
		<img class="title-bar-image" src="https://api.iconify.design/mdi:window-minimize.svg" alt="minimize" />
	</button>
	<button class="titlebar-button" id="titlebar-maximize">
		<img class="title-bar-image" src="https://api.iconify.design/mdi:window-maximize.svg" alt="maximize" />
	</button>
	<button class="titlebar-button hover:!bg-red-500 dark:hover:!bg-red-400" id="titlebar-close">
		<img class="title-bar-image" src="https://api.iconify.design/mdi:close.svg" alt="close" />
	</button>
</div>

<style lang="postcss">
	.titlebar-button {
		@apply inline-flex justify-center items-center w-8 h-8 hover:bg-gray-400 dark:bg-gray-800;
	}
	.title-bar-image {
		/* @apply dark:bg-slate-50; */
	}
</style>
