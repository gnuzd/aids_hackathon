import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

import type { PageServerLoad } from './$types';

const schema = z.object({ name: z.string().min(1) }).required({ name: true });

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		//TODO: call getOrCreateUser
		return message(form, 'Authorized');
	}
};
