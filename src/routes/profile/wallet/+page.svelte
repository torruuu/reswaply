<script>
    export let data;

    const user = data.user[0];
    const balance = user.balance.toFixed(2);
</script>

<h3>Tu saldo:</h3>
<p>{balance}</p>

<a href="#">Recargar</a>