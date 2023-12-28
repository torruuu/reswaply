<script>
    export let data;
    export let form;
    const user = data.user[0];

    let userForm = user.name;
    let emailForm = user.email;
    let enable = false;

    $: {
        if ((userForm !== user.name) || (emailForm !== user.email)) {
            enable = false;
        } else {
            enable = true;
        }
    }
</script>

<form method="post">
    <label>
        Usuario:
        <input type="text" name="user" bind:value={userForm} required>
    </label>
    <br>
    <label>
        Email:
        <input type="email" name="email" bind:value={emailForm} required>
    </label>
    <br>
    <label class:active={enable}>
        Contraseña:
        <input type="password" name="password" disabled={enable} required>
    </label>
    <br>

    <input type="submit" value="Actualizar" name="update" disabled={enable}>
</form>

{#if form?.error}
    <p class="error">{form.message}</p>
{/if}

{#if form?.success}
    <p>Datos actualizados correctamente</p>
{/if}

<style>
    .active {
        opacity: 0.5;
    }

    .error {
        color: red;
    }
</style>