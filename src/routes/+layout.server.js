export async function load({ cookies }) {
    const user = cookies.get('user');
    let authenticated = false;
    
    if (user !== undefined) {
        authenticated = true;
    }

    const responseProducts = await fetch("http://localhost:4000/products?_sort=name&_order=asc");
    const products = await responseProducts.json();

    const responsePosts = await fetch("http://localhost:4000/posts");
    const posts = await responsePosts.json();
    
    return { authenticated, products, posts }
}