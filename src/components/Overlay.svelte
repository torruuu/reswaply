<script>
	import { createEventDispatcher } from "svelte";

    export let title = '¿Estás seguro?';
    export let description = 'No podrás revertir esta acción';
    export let action = '';

    let dispatch = createEventDispatcher();

    function handleClick() {
        dispatch("close");
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="container" on:click={handleClick}>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="data" on:click|stopPropagation>
        <div class="logo">
            <i class="fa-solid fa-circle-exclamation"></i>
        </div>
        <h3>{title}</h3>
        <span>{description}</span>
        <div class="buttons">
            <form action={action} method="post">
                <button class="confirm">Confirmar</button>
                <button class="cancel" type="button" on:click={handleClick}>Cancelar</button>
                <slot />
            </form>
        </div>
    </div>
</div>

<style>
    .container {
        position: fixed;
        z-index: 2;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.4);
        top: 0;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .data {
        padding: 1rem 0;
        width: 30rem;
        height: 20rem;
        background-color: #fff;
        border-radius: 5px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .logo i {
        font-size: 7rem;
    }

    h3 {
        font-size: 1.7rem;
        margin: 1rem 0 0 0;
    }

    form {
        width: 15rem;

        display: flex;
        justify-content: space-between;
    }

    button {
        background: none;
        border: none;
        height: 3rem;
        width: 7rem;
        border-radius: 5px;
        cursor: pointer;
    }

    .confirm {
        background-color: #000;
        color: #fff;
    }

    .cancel {
        border: 2px solid #000;
    }
</style>