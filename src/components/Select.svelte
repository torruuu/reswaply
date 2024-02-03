<script>
	import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    export let enabled = true;
    export let selectedValue;
    let showValues = false;
    let clickOut;
    let inputValue = '';
    let dispatch = createEventDispatcher();

    onMount(() => {
        selectedValue = undefined;
    })

    function searchHandler() {
        dispatch('search', {
            value: inputValue
        });
    }

    function focusoutHandler() {
        dispatch('exit');
        inputValue = '';
        showValues = !showValues;
        clickOut = true;
    }

</script>

<button disabled={!enabled} on:click={() => {
    if (clickOut) {
        showValues = false;
        clickOut = false;
        return;
    }
    showValues = !showValues;
}}
    class:active={showValues}
    class="main-button">
    {selectedValue ? selectedValue : "Ej:Apple"}
</button>

{#if showValues}
    <div class="values">
        <input type="text" class="searcher" bind:value={inputValue} autofocus on:input={searchHandler} on:focusout={focusoutHandler}>
        <slot />
    </div>
{/if}

<style>
    .main-button, .searcher {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .main-button {
        width: 300px;
        height: 50px;
    }

    .active {
        border: 1px solid black;
        background-color: rebeccapurple;
    }

    .values {
        background-color: aquamarine;
        width: 300px;
        height: 240px;

        overflow: auto;
    }

    .searcher {
        outline: none;
        height: 30px;
    }
</style>