import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { message } from 'sveltekit-superforms';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { z } from 'zod';
import { BASE_URL } from '$env/static/private';

import type { PageServerLoad } from './$types';

const schema = z.object({ message: z.string().min(1) }).required({ message: true });

export const load: PageServerLoad = async ({ locals }) => {
	const form = await superValidate(zod(schema));
	const user = locals.auth.user as any;
	const res = await fetch(BASE_URL + '/chats', { headers: { 'x-user-id': user._id } });
	const messages = await res.json();

	return { form, messages, user };
};

export const actions: Actions = {
	send: async ({ request, locals }) => {
		const form = await superValidate(request, zod(schema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const user = locals.auth.user as any;
		const res = await fetch(BASE_URL + '/chats', {
			method: 'post',
			headers: {
				'x-user-id': user._id,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content: form.data.message })
		});
		const data = await res.json();
		return message(form, data);
	},
	logout: ({ cookies }) => {
		cookies.delete('user', { path: '/' });
		redirect(303, '/');
	}
};
