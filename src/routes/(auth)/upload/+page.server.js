export async function load() {
    const responseProducts = await fetch("http://localhost:4000/products?_sort=name&_order=asc");
    const products = await responseProducts.json();

    const responseConditions = await fetch("http://localhost:4000/conditions");
    const conditions = await responseConditions.json();

    return { products, conditions }
}