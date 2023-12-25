export async function load({ cookies }) {
    const response = await fetch("http://localhost:4000/posts");
    const posts = await response.json();

    const userName = cookies.get('user');
    return { posts, userName }
}