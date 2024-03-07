function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

export async function load({ params, parent, cookies }) {
    const product = params.product;
    const user = cookies.get('user');

    const { posts, products } = await parent();
    const filteredPosts = posts.filter(post => post.seller !== user)

    const productSearched = products.find(p => p.name === product);

    const postsSearched = filteredPosts.filter(post => post.product.name === product);
    const similarPosts = filteredPosts.filter(post => post.product.brand === productSearched.brand && post.product.name !== product);

    const uniqueColors = new Set();
    const uniqueStorages = new Set();
    const uniqueConditions = new Set()

    // Iteramos sobre cada producto y almacenamos su color en el conjunto
    for (const post of postsSearched) {
        uniqueColors.add(post.product.color);
        uniqueStorages.add(post.product.storage);
        uniqueConditions.add(post.condition);
    }

    // Convertimos el conjunto de colores únicos a un array
    const allColors = Array.from(uniqueColors).map(color => capitalizeFirstLetter(color));
    const allStorages = Array.from(uniqueStorages).sort((a, b) => a - b);
    const allConditions = Array.from(uniqueConditions);

    return { postsSearched, similarPosts, product, allColors, allStorages, allConditions }
}