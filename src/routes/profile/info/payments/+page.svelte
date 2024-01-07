<script>
    export let data;

    const card = data.user[0].card;
</script>

<p>{card?.number ?? 'No tiene ninguna tarjeta vinculada'}</p>
<a href="/profile/info/payments/update">Actualizar</a>