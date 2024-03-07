import { redirect } from '@sveltejs/kit';

export async function load({ params, cookies, parent }) {
    const postId = params.post;
    const user = cookies.get('user');

    const response = await fetch("http://localhost:4000/posts/" + postId);
    const post = await response.json();

    if (post.seller !== user) {
        throw redirect(303, '/posts/' + postId);
    }

    const { products, conditions } = await parent();
    return { post, products, conditions }
}