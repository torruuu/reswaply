export async function load({ params }) {
    const postId = params.postId;

    const response = await fetch("http://localhost:4000/posts/" + postId);
    const post = await response.json();

    return { post }
}