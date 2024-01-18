export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData(); // Recogemos los datos del formulario

        const cardholder = data.get('cardholder');
        const number = data.get('number');
        const month = data.get('month');
        const year = data.get('year');
        const cvc = data.get('code');

        const userName = cookies.get('user');

        const responseUsers = await fetch("http://localhost:4000/users");
        const users = await responseUsers.json();

        const user = users.find(user => user.name === userName);
        const userId = user.id;

        let errorMessage = "Error al actualizar los datos";

        const responseUpdate = await fetch(`http://localhost:4000/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify({
                "card": {
                    "cardholder": cardholder,
                    "number": number,
                    "month": month,
                    "year": year,
                    "cvc": cvc
                }
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (responseUpdate.ok) {
            return {success: true};
            // throw redirect(302, '/profile/info/payments');
        }

        return {
            error: true,
            message: errorMessage
        }
    }
};
