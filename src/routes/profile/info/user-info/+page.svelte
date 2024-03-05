<script>
    import Alert from '../../../../components/Alert.svelte';

    export let data;
    export let form;
    const user = data.user[0];

    let userForm = user.name;
    let emailForm = user.email;
    let enable = false;
    let showErrorForm = form?.error;

    $: {
        if ((userForm !== user.name) || (emailForm !== user.email)) {
            enable = false;
        } else {
            enable = true;
        }
    }
</script>

{#if showErrorForm}
    <Alert type={'error'} title={'Error'} description={form.message} on:close={() => showErrorForm = false}/>
{/if}

<div class="container">
    <form method="post">
        <h3>Actualiza tus datos</h3>
        <label>
            Usuario:
            <br>
            <input class="field" type="text" name="user" bind:value={userForm} required>
        </label>
        <br>
        <label>
            Email:
            <br>
            <input class="field" type="email" name="email" bind:value={emailForm} required>
        </label>
        <br>
        <label class:active={enable}>
            Contraseña:
            <br>
            <input class="field" type="password" name="password" disabled={enable} required>
        </label>
        <br>
    
        <input type="submit" value="Actualizar" name="update" disabled={enable}>
    </form>
</div>

<style>
    .container {
        margin-top: 2rem;
        width: 100%;
        display: flex;
        justify-content: center;
    }

    form {
        background-color: #fff;
        padding: 2rem 5rem;
        width: 40%;
        border-radius: 1rem;

        display: flex;
        flex-direction: column;  
    }

    h3 {
        margin: 0 0 1.5rem;
    }

    .field {
        margin-top: 0.5rem;
        width: 100%;
        border: none;
        border-bottom: 0.1rem solid rgb(205,205,205);
        font-size: 1.3rem;
    }

    .field:focus {
        outline: none;
        border-bottom: 0.1rem solid #000;
    }

    input[type="submit"] {
        border: none;
        margin: 0.5rem 0;
        font-size: 1.3rem;
        background-color: #000;
        color: #fff;
        width: 100%;
        padding: 0.5rem 0;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    input[type="submit"]:hover {
        opacity: 0.6;
    }

    input[type="submit"]:disabled {
        opacity: 0.5;
        cursor: auto;
    }

    .active {
        opacity: 0.5;
    }
</style>