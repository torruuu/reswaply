import { redirect } from '@sveltejs/kit';

export async function load({ cookies, fetch }) {
    const userName = cookies.get('user');
    const productUpload = cookies.get('productUpload');
    let showAlert = false;

    const response = await fetch("http://localhost:4000/posts?sold=false&seller=" + userName + "&_sort=id&_order=desc");
    const userPosts = await response.json();

    if (productUpload) {
        showAlert = true;
        cookies.delete('productUpload', { path: '/profile/products' });
    }

    return { userPosts, showAlert }
}

export const actions = {
    delete: async ({ request }) => {
        const data = await request.formData();
        const postId = data.get('id');

        const response = await fetch('http://localhost:4000/posts/' + postId, {
            method: 'DELETE'
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            return {
                success: true,
                title: 'Éxito',
                message: 'Producto borrado con éxito'
            };
        }

        return {
            error: true,
            title: 'Error',
            message: "Error al borrar el producto",
        }
    }
}