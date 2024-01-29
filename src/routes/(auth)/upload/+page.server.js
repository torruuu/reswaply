export async function load() {
    const response = await fetch("http://localhost:4000/products");
    const products = await response.json();

    return { products }
}