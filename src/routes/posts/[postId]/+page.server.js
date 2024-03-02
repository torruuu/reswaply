export async function load({ params, cookies }) {
    const postId = params.postId;
    const userName = cookies.get('user');

    const response = await fetch("http://localhost:4000/posts/" + postId);
    const post = await response.json();

    return { post, userName }
}