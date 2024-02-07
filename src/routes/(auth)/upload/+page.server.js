import { redirect } from '@sveltejs/kit';

export async function load() {
    const responseProducts = await fetch("http://localhost:4000/products?_sort=name&_order=asc");
    const products = await responseProducts.json();

    const responseConditions = await fetch("http://localhost:4000/conditions");
    const conditions = await responseConditions.json();

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
                throw redirect(302, '/profile/products');
            }
        }

        return {
            error: true,
            message: "Error al subir el producto",
        }
    }
};