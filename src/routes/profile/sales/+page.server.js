export async function load({ cookies }) {
    const userName = cookies.get('user');

    const response = await fetch("http://localhost:4000/posts?sold=true&seller=" + userName);
    const userPosts = await response.json();

    return { userPosts, userName }
}