export async function load({ params, parent, cookies }) {
    const product = params.product;
    const user = cookies.get('user');

    const { posts, products } = await parent();
    const filteredPosts = posts.filter(post => post.seller !== user)

    const productSearched = products.find(p => p.name === product);

    const postsSearched = filteredPosts.filter(post => post.product.name === product);
    const similarPosts = filteredPosts.filter(post => post.product.brand === productSearched.brand && post.product.name !== product);

    return { postsSearched, similarPosts, product }
}