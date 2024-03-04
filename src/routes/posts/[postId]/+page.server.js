export async function load({ params, cookies }) {
    const postId = parseInt(params.postId);
    const userName = cookies.get('user');

    const response = await fetch("http://localhost:4000/posts/" + postId);
    const post = await response.json();

    if (userName) {
        const responseUser = await fetch("http://localhost:4000/users?name=" + userName);
        const user = await responseUser.json();
        const userLikes = user[0].likes;
        const isLiked = userLikes.find(like => like === postId);

        return { post, userName, isLiked }
    } else {
        return { post }
    }
}

export const actions = {
    default: async ({ params, cookies }) => {
        const postId = parseInt(params.postId);
        const userName = cookies.get('user');

        const response = await fetch("http://localhost:4000/users?name=" + userName);
        const user = await response.json();
        let userLikes = user[0].likes;
        const userId = user[0].id;

        const alreadyLiked = userLikes.find(like => like === postId);

        let message = 'Producto eliminado de favoritos';

        if (alreadyLiked) {
            userLikes = userLikes.filter(like => like !== postId);
        } else {
            userLikes = [...userLikes, postId];
            message = 'Producto añadido a favoritos';
        }

        const responseLikes = await fetch('http://localhost:4000/users/' + userId, {
                method: 'PATCH',
                body: JSON.stringify({
                    "likes": userLikes
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
        if (responseLikes.ok) {
            return {
                success: true,
                message
            };
        }
    }
}