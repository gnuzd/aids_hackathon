<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Bot, ChevronsUpDown, Mic } from 'lucide-svelte';
	import { io } from 'socket.io-client';
	import { PUBLIC_WS_URL } from '$env/static/public';
	import MessageList from './message-list.svelte';

	let { data } = $props();

	let messages = $state(data.messages);

	const { form, submitting, enhance } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.message) {
				messages.push(form.message);
			}
		}
	});

	const socket = io(PUBLIC_WS_URL, { query: { user: data.user } });

	socket.on(data.user, (message: any) => {
		messages.push(message);
	});
</script>

<div class="fixed top-0 right-0 left-0 flex w-full justify-end bg-white p-4">
	<div
		class="inline-flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-300 px-3 py-1.5"
	>
		gpt-4o-2024-05-13 <ChevronsUpDown size={16} />
	</div>
</div>

<div class="flex h-full flex-col pb-10">
	<div class=" flex-1 overflow-auto">
		<div class="container m-auto">
			<MessageList {messages} />
		</div>
	</div>

	<form
		method="POST"
		use:enhance
		action="?/send"
		class="container m-auto flex w-full items-start rounded-md bg-gray-50 p-2"
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
