<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="container m-auto h-dvh">
	{@render children()}
</main>
