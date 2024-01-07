<script>
    export let data;

    const address = data.user[0].card;
</script>

<p>{address?.number ?? 'No tiene ninguna tarjeta vinculada'}</p>
<a href="/profile/info/payments/update">Actualizar</a>