<script lang="ts">
	import { Bot, User } from 'lucide-svelte';
	const { messages, user } = $props();
</script>

<div class="flex w-full">
	<div class="flex-1 overflow-y-auto text-sm leading-6 sm:text-base sm:leading-7">
		{#each messages as message}
			<div class="flex flex-col gap-3 p-4 sm:px-6">
				<div class="inline-flex gap-3">
					{#if message.outbound}
						<User /> <span>You</span>
					{:else}
						<Bot class="text-orange-600" /> <span>{user?.name || 'Assistant'}</span>
					{/if}
				</div>

				<div class="flex items-center">
					<p>{message.content}</p>
				</div>
			</div>
		{/each}
	</div>
</div>
