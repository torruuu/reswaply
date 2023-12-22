import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const user = cookies.get('user');

    if (user === undefined || user === '') {
        throw redirect(302, '/');
    }
}

export const actions = {
    default: ({ cookies }) => {
        cookies.set('user', '', { path: '/' });
    }
};