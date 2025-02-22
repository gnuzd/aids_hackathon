import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, type Actions } from '@sveltejs/kit';
import { z } from 'zod';

import type { PageServerLoad } from './$types';
import { BASE_URL } from '$env/static/private';

const schema = z.object({ name: z.string().min(1) }).required({ name: true });

export const load: PageServerLoad = async ({ locals }) => {
	const form = await superValidate(zod(schema));
	const user = locals?.auth?.user;
	return { form, user };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			const res = await fetch(BASE_URL + '/users', {
				method: 'post',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(form.data)
			});
			const user = await res.json();
			if (user) {
				cookies.set('user', user._id, { path: '/' });
				return message(form, { user });
			}

			return fail(404, { form });
		} catch (err) {
			return fail(400, { form });
		}
	}
};
