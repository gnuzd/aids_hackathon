import { BASE_URL } from '$env/static/private';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const userId = event.cookies.get('user') as any;

	if (!userId && '/' !== event.url.pathname) return redirect(303, '/');

	if (userId) {
		const res = await fetch(BASE_URL + `/users/${userId}`, {
			method: 'get',
			headers: {
				'x-user-id': userId,
				Accept: 'application/json',
				'Content-Type': 'application/json'
			}
		});
		const user = await res?.json();
		event.locals.auth = { user };
	}
	const response = await resolve(event);
	return response;
};
