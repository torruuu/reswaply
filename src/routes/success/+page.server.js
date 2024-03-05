import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    
    if (cookies.get('purchased-product')) {
        cookies.delete('purchased-product', { path: '/' });
    } else {
        throw redirect(303, '/');
    }

}