<script lang="ts">
	import { page } from '$app/state';
	import { fade } from 'svelte/transition';
	import '../app.css';
	let { children } = $props();
</script>

{#key page.url.pathname}
	<div transition:fade>
		{@render children()}
	</div>
{/key}
