export async function load({ params }) {
    const product = params.product;

    const response = await fetch("http://localhost:4000/posts?product.name=" + product);
    const posts = await response.json();

    return { posts }
}