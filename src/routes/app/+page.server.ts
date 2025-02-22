import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

import type { PageServerLoad } from './$types';
import { listChat } from '$lib/server/services/chat';

const schema = z.object({ message: z.string().min(1) }).required({ message: true });

export const load: PageServerLoad = async ({ locals }) => {
	const form = await superValidate(zod(schema));
	const user = locals.auth.user as any;
	let list: any = [];
	if (user) {
		list = await listChat(user);
	}
	return { form, messages: list };
};

export const actions: Actions = {
	send: async ({ request }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		// call chat gpt

		return message(form, {});
	}
};
