<script lang="ts">
	import Greet from '$lib/components/Greet.svelte'
	import { setAlwaysOnTop } from '$lib/utils/tauri'
	import { createSwitch, melt } from '@melt-ui/svelte'

	const {
		elements: { root, input },
		states: { checked },
	} = createSwitch()

	$: {
		setAlwaysOnTop($checked)
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
				use:melt={$root}
				class="relative h-6 cursor-default rounded-full bg-red-500 transition-colors data-[state=checked]:bg-blue-500"
				id="always-on-top"
				aria-labelledby="always-on-top-label"
			>
				<span class="block transition bg-white rounded-full thumb" />
			</button>
			<input use:melt={$input} />
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
