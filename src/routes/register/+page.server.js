import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData(); // Recogemos los datos del formulario
        const formUser = data.get('user');
        const formEmail = data.get('email');
        const formPassword = data.get('password');

        const response = await fetch("http://localhost:4000/users");
        const users = await response.json();

        const userFound = users.find((user) => user.name === formUser);
        const emailFound = users.find((user) => user.email === formEmail);

        let errorMessage = "Error al registrar el usuario en la base de datos"
        if (!userFound && !emailFound) {
            const responseInsert = await fetch('http://localhost:4000/users', {
                method: 'POST',
                body: JSON.stringify({
                    "name": formUser,
                    "email": formEmail,
                    "password": formPassword
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (responseInsert.ok) {
                cookies.set('user', formUser, { path: '/' });
                throw redirect(302, '/');
            }
        } else {
            errorMessage = "El usuario introducido ya existe";
            if (emailFound) {
                errorMessage = "Este email ya está en uso";
            }
        }
        return {
            error: true,
            message: errorMessage,
            formUser
        }
    }
};