import { redirect } from '@sveltejs/kit';

export async function load({ parent }) {
    const { products, conditions } = await parent();

    return { products, conditions }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData(); // Recogemos los datos del formulario
        const productId = data.get('product');
        const condition = data.get('condition');
        const price = data.get('price');
        const description = data.get('description');
        const seller = cookies.get('user');

        const productResponse = await fetch("http://localhost:4000/products/" + productId);

        if (productResponse.ok) {
            const product = await productResponse.json();

            const responseInsert = await fetch('http://localhost:4000/posts', {
                method: 'POST',
                body: JSON.stringify({
                    "seller": seller,
                    "product": product,
                    "condition": condition,
                    "description": description,
                    "price": price,
                    "sold": false,
                    "buyer": null
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (responseInsert.ok) {
                cookies.set('productUpload', true, { path: '/profile/products' });
                throw redirect(302, '/profile/products');
            }
        }

        return {
            error: true,
            title: 'Error',
            message: "Error al subir el producto",
        }
    }
};