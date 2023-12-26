import { redirect } from '@sveltejs/kit';

// export function load({ cookies }) {
//     const user = cookies.get('user');

//     if (user === undefined) {
//         throw redirect(302, '/');
//     }
// }

export const actions = {
    default: ({ cookies }) => {
        cookies.delete('user', { path: '/' });
        throw redirect(302, '/');
    }
};