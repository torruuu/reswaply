import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    const userName = cookies.get('user');

    const response = await fetch("http://localhost:4000/users?name=" + userName);
    const user = await response.json();

    return { user }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData(); // Recogemos los datos del formulario
        const amount = +data.get('amount');

        const userName = cookies.get('user');
        const response = await fetch("http://localhost:4000/users?name=" + userName);

        if (!response.ok) {
            throw error(402, 'Error al cargar los datos del usuario');
        }

        const user = await response.json();
        const userJson = user[0];
        const userId = userJson.id;
        const userBalance = userJson.balance;
        const totalBalance = userBalance + amount;

        const responseUpdate = await fetch(`http://localhost:4000/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "balance": totalBalance
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (responseUpdate.ok) {
            throw redirect(302, '/profile/wallet');
        }
        
        throw error(402, 'Error al actualizar el balance');
    }
};