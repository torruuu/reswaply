import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData(); // Recogemos los datos del formulario

        const province = data.get('province');
        const city = data.get('city');
        const cp = data.get('cp');
        const address = data.get('address');
        const number = data.get('number');
        const door = data.get('door');

        const userName = cookies.get('user');

        const responseUsers = await fetch("http://localhost:4000/users");
        const users = await responseUsers.json();

        const user = users.find(user => user.name === userName);
        const userId = user.id;

        let errorMessage = "Error al actualizar los datos";

        const responseUpdate = await fetch(`http://localhost:4000/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "address": {
                    "province": province,
                    "city": city,
                    "cp": cp,
                    "street": address,
                    "number": number,
                    "door": door
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (responseUpdate.ok) {
            throw redirect(302, '/profile/info/address');
        }

        return {
            error: true,
            message: errorMessage
        }
    }
};