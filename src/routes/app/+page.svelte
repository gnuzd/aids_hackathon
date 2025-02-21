<script>
	import { superForm } from 'sveltekit-superforms';
	import { Mic } from 'lucide-svelte';

	import MessageList from './message-list.svelte';

	let { data } = $props();
	const { form, submitting, submit, enhance } = superForm(data.form, {
		onUpdated: ({ form }) => {
			messages.push(form.message[0]);
		}
	});

	let messages = $state(data.messages);
</script>

<div class="flex h-full flex-col">
	<div class="flex-1">
		<MessageList {messages} />
	</div>

	<form
		method="POST"
		use:enhance
		action="?/send"
		class="flex w-full items-start rounded-md bg-gray-50 p-2"
	>
		<label for="prompt" class="sr-only">Enter your prompt</label>

		<textarea
			id="prompt"
			rows={1}
			name="message"
			bind:value={$form.message}
			class="mx-2 flex w-full resize-none border-b border-gray-300 py-2
		transition outline-none focus:border-orange-500"
			placeholder="Enter your prompt"
		></textarea>
		<div class="flex gap-2">
			<button
				class="cursor-pointer rounded-lg hover:bg-gray-200/75 hover:text-orange-600 sm:p-2"
				type="button"
			>
				<Mic /> <span class="sr-only">voice message</span>
			</button>

			<button
				type="submit"
				disabled={!!$submitting}
				class:opacity-50={!!$submitting}
				class="inline-flex cursor-pointer items-center justify-center rounded-lg
				hover:bg-gray-200/75 hover:text-orange-600 sm:p-2"
			>
				Send
			</button>
		</div>
	</form>
</div>
