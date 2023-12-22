<script>
    export let form;
</script>

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
    <p>{form.message}</p>
{/if}