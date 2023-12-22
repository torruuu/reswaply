import { redirect } from '@sveltejs/kit';

// export function load({ state }) {
//     const user = state?.user;
//     const password = state?.password;

//     return { user, password }
// }

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
            cookies.set('user', formUser, { path: '/' });
            throw redirect(302, '/');
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