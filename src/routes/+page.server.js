export async function load({ cookies, parent }) {
    const userName = cookies.get('user');
    const { posts } = await parent();
    const filteredPosts = posts.filter(post => !post.sold && post.seller !== userName);

    const mobilePosts = filteredPosts.filter(post => post.product.category === 'mobiles');
    const tabletPosts = filteredPosts.filter(post => post.product.category === 'tablets');
    const consolePosts = filteredPosts.filter(post => post.product.category === 'consoles');

    return { userName, mobilePosts, tabletPosts, consolePosts }
}