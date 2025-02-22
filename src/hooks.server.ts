import { dbConnect } from '$lib/server/db';
import { redirect, type Handle } from '@sveltejs/kit';

await dbConnect();

export const handle: Handle = async ({ event, resolve }) => {
	const user = event.cookies.get('user') as any;

	if (!user && '/' !== event.url.pathname) return redirect(303, '/');

	event.locals.auth = { user };
	const response = await resolve(event);
	return response;
};
