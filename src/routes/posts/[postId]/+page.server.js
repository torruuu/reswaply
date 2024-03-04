export async function load({ params, cookies }) {
    const postId = params.postId;
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
        const postId = params.postId;
        const userName = cookies.get('user');

        const response = await fetch("http://localhost:4000/users?name=" + userName);
        const user = await response.json();
        const userLikes = user[0].likes;
        const userId = user[0].id;

        const alreadyLiked = userLikes.find(like => like === postId);

        let message = 'Producto eliminado de favoritos';
        let userLikesUpdated = [];

        if (alreadyLiked) {
            userLikesUpdated = userLikes.filter(like => like !== postId);
        } else {
            userLikesUpdated = [...userLikes, postId];
            message = 'Producto añadido a favoritos'
        }

        const responseLikes = await fetch('http://localhost:4000/users/' + userId, {
                method: 'PATCH',
                body: JSON.stringify({
                    "likes": userLikesUpdated
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