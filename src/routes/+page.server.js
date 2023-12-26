export async function load({ cookies }) {
    const response = await fetch("http://localhost:4000/posts?sold=false");
    const posts = await response.json();

    const userName = cookies.get('user');
    return { posts, userName }
}