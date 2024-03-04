import { redirect } from '@sveltejs/kit';

export const actions = {
    logout: ({ cookies }) => {
        cookies.delete('user', { path: '/' });
        throw redirect(302, '/');
    }
};