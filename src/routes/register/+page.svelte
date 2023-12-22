<script>
    export let form;
</script>

<h2>Registration</h2>
<form method="post">
    <label>
        Usuario:
        <input type="text" name="user" required>
    </label>
    <br>
    <label>
        Correo:
        <input type="email" name="email" required>
    </label>
    <br>
    <label>
        Contraseña:
        <input type="text" name="password" required>
    </label>
    <input type="submit" name="enviar" value="Enviar">
</form>

{#if form?.error}
    <p class="error">{form.message}</p>
{/if}

<style>
    .error {
        color: red;
    }
</style>