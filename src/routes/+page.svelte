<script lang="ts">
	import Greet from '$lib/components/Greet.svelte'
	import welcome_fallback from '$lib/images/svelte-welcome.png'
	import welcome from '$lib/images/svelte-welcome.webp'
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>Home</h1>

	<Greet />
</section>

<style>
</style>
