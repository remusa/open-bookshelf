<script lang="ts">
	import Greet from '$lib/components/Greet.svelte'
	import { updateSettings } from '$lib/utils/settings'
	import { shortcut } from '$lib/utils/shortcuts'
	import { createSwitch, melt } from '@melt-ui/svelte'
	import type { PageData } from './$types'

	export let data: PageData
	const { settings } = data

	const {
		elements: { root: alwaysOnTopRoot, input: alwaysOnTopInput },
		states: { checked: alwaysOnTopChecked },
	} = createSwitch({
		defaultChecked: !!settings.alwaysOnTop,
	})

	$: {
		updateSettings('alwaysOnTop', $alwaysOnTopChecked)
	}

	const {
		elements: { root: useCustomTitlebarRoot, input: useCustomTitlebarInput },
		states: { checked: useCustomTitlebarChecked },
	} = createSwitch({
		defaultChecked: !!settings.useCustomTitlebar,
	})

	$: {
		updateSettings('useCustomTitlebar', $useCustomTitlebarChecked)
	}
</script>

<svelte:head>
	<title>Settings</title>
	<meta name="description" content="Settings" />
</svelte:head>

<section>
	<h1>Settings</h1>

	<Greet />

	<form>
		<div class="flex items-center">
			<label class="pr-4 leading-none capitalize" for="always-on-top" id="always-on-top-label">always on top</label>
			<button
				use:melt={$alwaysOnTopRoot}
				use:shortcut={{ code: 'KeyA', control: true }}
				class="relative h-6 cursor-default rounded-full bg-red-500 transition-colors data-[state=checked]:bg-blue-500"
				id="always-on-top"
				aria-labelledby="always-on-top-label"
			>
				<span class="block transition bg-white rounded-full thumb" />
			</button>
			<input use:melt={$alwaysOnTopInput} />
		</div>

		<div class="flex items-center">
			<label class="pr-4 leading-none capitalize" for="custom-titlebar" id="custom-titlebar-label"
				>use custom titlebar</label
			>
			<button
				use:melt={$useCustomTitlebarRoot}
				use:shortcut={{ code: 'KeyT', control: true }}
				class="relative h-6 cursor-default rounded-full bg-red-500 transition-colors data-[state=checked]:bg-blue-500"
				id="custom-titlebar"
				aria-labelledby="custom-titlebar-label"
			>
				<span class="block transition bg-white rounded-full thumb" />
			</button>
			<input use:melt={$useCustomTitlebarInput} />
		</div>
	</form>
</section>

<style lang="postcss">
	button {
		--w: 2.75rem;
		--padding: 0.125rem;
		width: var(--w);
	}

	.thumb {
		--size: 1.25rem;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
