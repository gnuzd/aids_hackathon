<script>
	import { superForm } from 'sveltekit-superforms';
	import { Button, Dialog } from 'bits-ui';
	import { ArrowRight, Bot } from 'lucide-svelte';
	import { goto } from '$app/navigation';

	const { data } = $props();

	const { form, enhance } = superForm(data.form, {
		onUpdated: () => {
			goto('/app');
		}
	});
</script>

<Dialog.Root>
	<nav class="p-4">
		<a class="flex gap-5" href="/">
			<Bot class="h-8 w-auto text-orange-600" />
			<span class="text-3xl font-bold">AIDs</span>
		</a>
	</nav>

	<section class="flex h-full flex-col items-center justify-center gap-16 p-4">
		<div
			class="rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
		>
			<span>Announcing our hackathons of funding.</span>
			<a
				href="https://docs.google.com/presentation/d/1jSTqT2EepYfRuVHNEzMvkS4OYIjj1rC71kQ6AMX4H4Q/edit?pli=1#slide=id.g110860aa576_0_0"
				class="font-semibold text-orange-600"
			>
				<span class="inset-0" aria-hidden="true"></span>Read more
				<span aria-hidden="true">&rarr;</span>
			</a>
		</div>

		<div class="flex flex-col items-center gap-3">
			<h1 class="text-5xl font-semibold text-balance text-gray-900">Hackathon 2025</h1>
			<p class="text-lg font-medium text-pretty text-gray-500">AI-powered coding assistant</p>

			<Dialog.Trigger
				class="cursor-pointer rounded-lg px-3 py-2 font-semibold text-orange-500 transition hover:bg-orange-600/10"
			>
				Get Started
			</Dialog.Trigger>
		</div>
	</section>

	<Dialog.Portal>
		<Dialog.Overlay class="fixed inset-0 z-50 bg-zinc-900/75" />
		<Dialog.Content
			class="fixed top-[50%] left-[50%] z-50 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] rounded-lg border bg-white p-5 p-7 sm:max-w-[490px] md:w-full"
		>
			<Dialog.Description>
				<form class="flex flex-col gap-3" method="POST" use:enhance>
					<div class=" flex flex-col gap-2 font-semibold">
						<label for="name" class="text-sm">Tell me your name</label>
						<input
							type="text"
							name="name"
							placeholder="Input your name"
							class="rounded px-3 py-1.5 font-medium ring ring-zinc-300 outline-none focus:ring-orange-600"
						/>
					</div>
					<Button.Root
						class="inline-flex w-fit cursor-pointer items-center gap-3 rounded-lg px-3 py-2 font-semibold text-orange-500 transition hover:bg-orange-600/10"
					>
						<span>Continue</span>
						<ArrowRight size={18} />
					</Button.Root>
				</form>
			</Dialog.Description>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
