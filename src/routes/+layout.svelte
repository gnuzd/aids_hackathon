<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="h-dvh">
	{@render children()}
</main>
