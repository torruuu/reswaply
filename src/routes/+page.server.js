export async function load({ cookies }) {
    const responsePosts = await fetch("http://localhost:4000/posts?sold=false");
    const posts = await responsePosts.json();

    const userName = cookies.get('user');
    return { posts, userName }
}