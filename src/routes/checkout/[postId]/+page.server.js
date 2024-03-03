import { redirect } from '@sveltejs/kit';

export async function load({ params, cookies }) {
    const postId = params.postId;
    const userName = cookies.get('user');

    if (!userName) {
        throw redirect(303, '/login/');
    }

    const response = await fetch("http://localhost:4000/posts/" + postId);
    const post = await response.json();

    if (userName === post.seller || post.sold) {
        throw redirect(303, '/posts/' + postId);
    }
    
    const responseUser = await fetch("http://localhost:4000/users?name=" + userName);
    const user = await responseUser.json();

    // Verificar si user[0].card existe y si card.number no es null ni undefined
    let cardNumber = undefined;
    let cardholder = undefined;
    if (user[0].card) {
        let digitos = user[0].card.number.replace(/\s/g, "");
        
        // Obtener los últimos cuatro dígitos
        let ultimosCuatro = digitos.slice(-4);

        // Generar una cadena de asteriscos para los dígitos ocultos
        let asteriscos = "**** **** **** ";

        // Combinar los asteriscos con los últimos cuatro dígitos
        cardNumber = asteriscos + ultimosCuatro;
        cardholder = user[0].card.cardholder;
    }

    const address = user[0].address;

    return { post, cardNumber, cardholder, address }
}