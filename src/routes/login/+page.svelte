<script>
    export let form;
</script>

<h2>Log in</h2>
<form method="post">
    <label>
        Usuario:
        <input type="text" name="user" value={form?.formUser ?? ''} required>
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