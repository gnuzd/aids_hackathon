import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

import type { PageServerLoad } from './$types';

const schema = z.object({ message: z.string().min(1) }).required({ message: true });

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return { form, messages: [] };
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
