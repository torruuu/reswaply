<script>
    export let data;

    const address = data.user[0].address;
</script>

<p>{(address?.street + ", " + address?.number) ?? 'No tiene ninguna dirección vinculada'}</p>
<a href="/update-address">Actualizar</a>