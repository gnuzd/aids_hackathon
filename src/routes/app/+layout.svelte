<script lang="ts">
	import PromptHistory from './prompt-history.svelte';

	const { children } = $props();
</script>

<div class="flex">
	<PromptHistory />
	<div class="flex-1 px-2 py-4 pr-4">
		{@render children()}
	</div>
</div>
