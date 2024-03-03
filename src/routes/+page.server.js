export async function load({ cookies, parent }) {
    const userName = cookies.get('user');
    const { posts } = await parent();
    const filteredPosts = posts.filter(post => !post.sold && post.seller !== userName);

    return { userName, filteredPosts }
}