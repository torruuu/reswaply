import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    const user = cookies.get('user');

    if (user !== undefined && user !== '') {
        throw redirect(302, '/');
    }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData(); // Recogemos los datos del formulario
        const formUser = data.get('user');
        const formPassword = data.get('password');

        const response = await fetch("http://localhost:4000/users");
        const users = await response.json();

        const userFound = users.find((user) => user.name === formUser);
        const correctData = users.find((user) => user.name === formUser && user.password === formPassword);

        if (correctData) {
            console.log("Usuario válido");
            cookies.set('user', formUser, { path: '/' });
        } else {
            let errorMessage = "El usuario introducido no existe";
            if (userFound) {
               errorMessage = "Contraseña incorrecta";
            }
            return {
                error: true,
                message: errorMessage,
                formUser
            }
        }
    }
};