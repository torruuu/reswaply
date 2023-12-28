export async function load({ cookies }) {
    const userName = cookies.get('user');

    const response = await fetch("http://localhost:4000/users?name=" + userName);
    const user = await response.json();

    return { user }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData(); // Recogemos los datos del formulario
        const formUser = data.get('user');
        const formEmail = data.get('email');
        const formPassword = data.get('password');

        const userName = cookies.get('user');

        const responseUsers = await fetch("http://localhost:4000/users");
        const users = await responseUsers.json();

        const user = users.find(user => user.name === userName);

        let emailFound = false;
        let userFound = false;
        let errorMessage = "Contraseña incorrecta";

        const correctPassword = users.find((user) => user.name === userName && user.password === formPassword);

        if (!correctPassword) {
            return {
                error: true,
                message: errorMessage
            }
        }

        if (formUser === user.name) {
            emailFound = users.find((user) => user.email === formEmail);
        }

        if (formEmail === user.email) {
            userFound = users.find((user) => user.name === formUser);
        }

        if ((formEmail !== user.email) && (formUser !== user.name)) {
            userFound = users.find((user) => user.name === formUser);
            emailFound = users.find((user) => user.email === formEmail);
        }

        if (userFound || emailFound) {
            errorMessage = "El email introducido ya está en uso";
            if (userFound) {
                errorMessage = "El usuario introducido ya está en uso";
            }
            return {
                error: true,
                message: errorMessage
            }
        }

        const userId = user.id;

        const responseUpdate = await fetch(`http://localhost:4000/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "name": formUser,
                "email": formEmail
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (responseUpdate.ok) {
            cookies.set('user', formUser, { path: '/' });
            return { success: true }
        }

        errorMessage = "Error al actualizar los datos"

        return {
            error: true,
            message: errorMessage
        }
    }
};