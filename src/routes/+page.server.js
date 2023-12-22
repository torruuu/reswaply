export async function load({ cookies }) {
    const response = await fetch("http://localhost:4000/exercises");
    const exercises = await response.json();

    const userName = cookies.get('user');
    return { exercises, userName }
}