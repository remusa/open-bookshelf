<script lang="ts">
	import Greet from '$lib/components/Greet.svelte'
	import welcome_fallback from '$lib/images/svelte-welcome.png'
	import welcome from '$lib/images/svelte-welcome.webp'
</script>

<svelte:head>
	<title>Reading</title>
	<meta name="description" content="Reading" />
</svelte:head>

<section>
	<h1>Reading</h1>

	<Greet />
</section>
