<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { ChevronsUpDown, LogOut, Mic } from 'lucide-svelte';
	import { io } from 'socket.io-client';
	import { Button } from 'bits-ui';
	import { onMount } from 'svelte';
	import { PUBLIC_WS_URL } from '$env/static/public';
	import MessageList from './message-list.svelte';

	let { data } = $props();

	let element: any;
	let messages = $state(data.messages);

	const { form, submitting, enhance, submit } = superForm(data.form, {
		onUpdated: ({ form }) => {
			if (form.message) {
				messages.push(form.message);
				scrollToBottom(element);
			}
		}
	});

	const scrollToBottom = async (node: any) => {
		node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
	};

	onMount(() => {
		scrollToBottom(element);
		if (data.user._id) {
			const socket = io(PUBLIC_WS_URL, { query: { user: data.user._id } });

			socket.on(data.user._id, (message: any) => {
				messages.push(message);
				scrollToBottom(element);
			});
		}
	});
</script>

<div class="fixed top-0 right-0 left-0 flex w-full justify-end gap-3 bg-white px-8 py-4">
	<div
		class="inline-flex cursor-pointer items-center gap-3 rounded-lg border border-zinc-300 px-3 py-1.5"
	>
		gpt-4o-2024-05-13 <ChevronsUpDown size={16} />
	</div>
	<form method="POST" action="?/logout">
		<Button.Root class="cursor-pointer rounded-lg p-2 hover:bg-zinc-100" type="submit">
			<LogOut class="text-zinc-500" size={22} />
		</Button.Root>
	</form>
</div>

<div class="flex h-full flex-col pb-10">
	<div bind:this={element} class="mt-14 flex-1 overflow-auto">
		<div class="container m-auto">
			<MessageList {messages} user={data.user} />
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
			onkeydown={(e) => {
				if (e.key === 'Enter' && e.metaKey) submit();
			}}
			class="mx-2 flex w-full resize-none border-b border-gray-300 py-2 transition outline-none focus:border-orange-500"
			placeholder="Enter your prompt"
		></textarea>
		<div class="flex gap-2">
			<button
				type="submit"
				disabled={!!$submitting || !$form.message}
				class:text-orange-700={!!$submitting}
				class:opacity-50={!!$submitting}
				class="inline-flex cursor-pointer items-center justify-center rounded-md
				bg-gray-200/50 px-6 py-2 font-medium hover:bg-gray-200/75 hover:text-orange-600 disabled:opacity-25"
			>
				{#if $submitting}
					Running
				{:else}
					Run
				{/if}
			</button>
		</div>
	</form>
</div>
