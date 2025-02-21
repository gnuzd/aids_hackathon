<script>
	import { Bot, User } from 'lucide-svelte';
	const { messages } = $props();
</script>

<div class="flex w-full">
	<div class="flex-1 overflow-y-auto text-sm leading-6 sm:text-base sm:leading-7">
		{#each messages as message}
			<div class="flex flex-col gap-3 p-4 sm:px-6">
				<div class="inline-flex gap-3">
					{#if message.send_by === 'user'}
						<User />
						<span>User</span>
					{:else}
						<Bot /> <span>Assistant</span>
					{/if}
				</div>

				<div class="flex max-w-3xl items-center">
					<p>{message.text}</p>
				</div>
			</div>{/each}
	</div>
</div>
