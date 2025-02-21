<script>
	import { Plus } from 'lucide-svelte';
</script>

<div class="h-dvh p-2">
	<div class="flex h-full w-80 flex-col gap-2 rounded-lg bg-gray-200/50 p-4 text-sm">
		<button
			class="inline-flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-200/75"
		>
			<Plus size={20} />New Chat
		</button>

		<div>
			<div class="rounded-md bg-gray-200/75 px-3 py-2 hover:bg-gray-200/75">
				<h1 class="text-sm font-medium text-slate-700 capitalize">What is GPT UI?</h1>
				<p class="text-xs text-slate-500 dark:text-slate-400">1 Jan</p>
			</div>
		</div>
	</div>
</div>

