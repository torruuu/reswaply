export async function load({ cookies, fetch }) {
    const userName = cookies.get('user');
    const productUpload = cookies.get('productUpload');
    let showAlert = false;

    const response = await fetch("http://localhost:4000/posts?sold=false&seller=" + userName + "&_sort=id&_order=desc");
    const userPosts = await response.json();

    if (productUpload) {
        showAlert = true;
        cookies.delete('productUpload', { path: '/profile/products' });
    }

    return { userPosts, showAlert }
}