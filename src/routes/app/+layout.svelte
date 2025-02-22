<script lang="ts">
	import PromptHistory from './prompt-history.svelte';

	const { children } = $props();
</script>

<div class="h-dvh p-4">
	{@render children()}
</div>
