export async function load({ cookies, parent }) {
    const userName = cookies.get('user');

    const response = await fetch("http://localhost:4000/users?name=" + userName);
    const user = await response.json();
    const likes = user[0].likes;

    const { posts } = await parent();

    const likedPosts = posts.filter(post => likes.includes(post.id));

    return { likedPosts }
}