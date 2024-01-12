export async function load({ cookies }) {
    const userName = cookies.get('user');

    const response = await fetch("http://localhost:4000/users?name=" + userName);
    const user = await response.json();

    return { user }
}