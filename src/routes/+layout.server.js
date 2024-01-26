export async function load({ cookies }) {
    const user = cookies.get('user');
    let authenticated = false;
    
    if (user !== undefined) {
        authenticated = true;
    }

    const responseProducts = await fetch("http://localhost:4000/products");
    const products = await responseProducts.json();
    
    return { authenticated, products }
}