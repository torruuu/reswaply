<script>
    export let form;
</script>

<div class="login-main">
    <div class="login-last">
        <legend>
            <h2>Registrar</h2>
            <form method="post">
                <input class="field" type="text" name="user" required placeholder="Usuario">
                <br>
                <input class="field" type="email" name="email" required placeholder="E-mail">
                <br>
                <input class="field" type="text" name="password" required placeholder="Contraseña">
                <div class="error-div">
                    {#if form?.error}
                        <p class="error">{form.message}</p>
                    {/if}
                </div>
                <input type="submit" name="enviar" value="Registar">
            </form>
            <span class="link">¿Ya tienes una cuenta? <a href="/login">Log in</a></span>
        </legend>
    </div>
</div>

<style>
	.login-main {
		height: 100vh;
		width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
	}

	legend {
        border: 0.1rem solid rgb(205,205,205);
        width: 25rem;
        border-radius: 0.5rem;
        background-color: #fff;
        padding: 2rem;
    }

    h2 {
        margin: 0 0 1.5rem;
        text-align: center;
        font-size: 2.5rem;
    }

    form {
        display: flex;
        flex-direction: column;
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

	.error {
        margin: 0.3rem 0 0;
		color: red;
	}

    .error-div {
        height: 2rem;
        padding-left: 0.2rem;
    }
</style>