import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const userName = cookies.get('user');

    if (!userName) {
        throw redirect(303, '/login');
    }

    const response = await fetch("http://localhost:4000/users?name=" + userName);
    const user = await response.json();

    const responseConditions = await fetch("http://localhost:4000/conditions");
    const conditions = await responseConditions.json();

    return { user, conditions }
}