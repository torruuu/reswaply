export async function load({ cookies }) {
    const userName = cookies.get('user');

    const response1 = await fetch("http://localhost:4000/users?name=" + userName);
    const userJson = await response1.json();
    const userId = userJson[0].id;

    const response2 = await fetch("http://localhost:4000/users/" + userId + "/posts");
    const userPosts = await response2.json();

    return { userPosts }
}