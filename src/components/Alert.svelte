<script>
    import { createEventDispatcher } from "svelte";
    import { onMount } from "svelte";

    export let type = 'success';
    export let title = 'Notification title';
    export let description = 'This is the notification description';

    let dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('close');
    }

    onMount(() => {
        // Definir el tiempo de espera (en milisegundos)
        const timeoutDuration = 5000; // 5000 milisegundos = 5 segundos

        // Establecer el temporizador para ejecutar handleClick después del tiempo especificado
        const timeoutId = setTimeout(handleClick, timeoutDuration);

        // Limpiar el temporizador cuando el componente se destruye
        return () => {
            clearTimeout(timeoutId);
        };
    });
</script>

<div class="container" class:success={type === 'success'} class:error={type === 'error'}>
    <div class="logo">
        {#if type === 'success'}
            <i class="fa-solid fa-check"></i>
        {:else if type === 'error'}
            <i class="fa-solid fa-circle-exclamation"></i>
        {:else}
            <i class="fa-solid fa-check"></i>
        {/if}
    </div>
    <div class="title">
        <h3>{title}</h3>
    </div>
    <div class="description">
        <span>{description}</span>
    </div>
    <div class="cross">
        <button on:click={handleClick}>
            <i class="fa-solid fa-xmark"></i>
        </button>
    </div>
</div>

<style>
    .container {
        width: 30rem;
        height: 6rem;
        background-color: aqua;
        position: fixed;
        z-index: 1;
        top: 6rem;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 0.4rem;

        display: grid;
        grid-template-columns: 1.5fr 7fr 1fr;
        grid-template-rows: 1fr 1fr;
        grid-template-areas: 
            "logo title cross"
            "logo description cross"
        ;
    }

    .success {
        background-color: #28a745;
    }

    .error {
        background-color: #dc3545;
    }

    .logo {
        grid-area: logo;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
    }

    .title {
        padding-top: 2vh;
        grid-area: title;
    }

    .description {
        grid-area: description;
    }

    .cross {
        grid-area: cross;
        padding-top: 0.3rem;
        padding-right: 0.3rem;
        text-align: end;
    }

    h3 {
        margin: 0;
        padding: 0;
    }

    h3, span, i {
        color: #fff;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }
</style>