<script>
    import { onMount } from "svelte";

    export let title;
    export let params;
    export let extraTxt = '';
    export let resetFilters;
    export let checkedValues = [];

    let resetThisFilter = true;

    onMount(() => {
        checkedValues = [];
    })

    function handleChange(event, param) {
        if (event.target.checked) {
        // Si se marca el checkbox, agregamos el valor a datosSeleccionados
        checkedValues = [...checkedValues, param];
        } else {
        // Si se desmarca, eliminamos el valor de datosSeleccionados
        checkedValues = checkedValues.filter(valor => valor !== param);
        }
    }

    function clear() {
        checkedValues = [];
        resetThisFilter = !resetThisFilter;
    }
</script>

<div class="container">
    {#key resetFilters}
        <h3>{title}</h3>
        <div class="inputs">
            <label class:disabled={checkedValues.length === 0}>  
                <input checked={checkedValues.length === 0} disabled={checkedValues.length === 0} type="checkbox" name="all" on:click={clear}>
                <i class="fa-solid fa-check"></i>
                Todos
                <br>
            </label>
            {#key resetThisFilter}
                {#each params as title}
                    <label>     
                        <input type="checkbox" name={title} on:change={(e) => handleChange(e, title)}/>
                        <i class="fa-solid fa-check"></i>
                        {title} {extraTxt}
                    </label>
                {/each}
            {/key}
        </div>
    {/key}
</div>

<style>
    .disabled, input:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }

    input:not(:checked) + i {
        display: none;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }

    input:enabled, label {
        cursor: pointer;
    }

    input {
        display: inline-block;
        width: 1.4rem;
        height: 1.4rem;
        border: 0.1rem solid #000;
        border-radius: 0.5rem;
        appearance: none;
    }

    input:checked {
        background-color: #000;
    }

    label {
        display: flex;
        align-items: center;
        gap: 0.4rem;
    }

    i {
        position: absolute;
        transform: translateX(0.5rem);
        color: #fff;
        font-size: 0.9rem;
    }
</style>