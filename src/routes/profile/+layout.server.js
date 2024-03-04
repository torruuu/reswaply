import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const userName = cookies.get('user');

    if (!userName) {
        throw redirect(302, '/login');
    }
}