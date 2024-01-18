export async function load({ cookies }) {
    const userName = cookies.get('user');

    const response = await fetch("http://localhost:4000/users?name=" + userName);
    const user = await response.json();

    // Verificar si user[0].card existe y si card.number no es null ni undefined
    let cardNumber = null;
    let cardholder = null;
    if (user[0].card) {
        let digitos = user[0].card.number.replace(/\s/g, "");
        
        // Obtener los últimos cuatro dígitos
        let ultimosCuatro = digitos.slice(-4);

        // Generar una cadena de asteriscos para los dígitos ocultos
        let asteriscos = "*".repeat(digitos.length - 4);

        // Combinar los asteriscos con los últimos cuatro dígitos
        cardNumber = asteriscos + ultimosCuatro;
        cardholder = user[0].card.cardholder;
    }

    const email = user[0].email;
    const address = user[0].address;

    return { userName, email, address, cardNumber, cardholder }
}
