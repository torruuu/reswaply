<script>
    export let data;

    const card = data.user[0].card;
    let resultado;

    if (card) {
        let digitos = card.number.replace(/\s/g, "");

        // Obtener los últimos cuatro dígitos
        let ultimosCuatro = digitos.slice(-4);

        // Generar una cadena de asteriscos para los dígitos ocultos
        let asteriscos = "*".repeat(digitos.length - 4);

        // Combinar los asteriscos con los últimos cuatro dígitos
        resultado = asteriscos + ultimosCuatro;
    }
</script>

{#if card}
    <h4>¿Cuanto dinero quiere recargar?</h4>
    <form method="post">
        <input type="number" name="amount">
        <input type="submit" name="submit" value="Recargar">
    </form>
    <h4>Metodo de pago:</h4>
    <p>{resultado}</p>
{:else}
    <h4>No tiene ninguna tarjeta vinculada</h4>
    <h2>¿Quiere añadir una?</h2>
    <a href="/profile/info/payments/update">Añadir</a>
{/if}