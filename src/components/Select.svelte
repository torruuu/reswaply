<script>
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();
    export let values;
    export let enabled = true;
    let showValues = false;
    let clickOut;
    let selectedValue;

    function selectHandler(e) {
        if(e.button === 0) {
            selectedValue = e.target.innerText;
        }
        dispatch("select", {
            value: selectedValue
        });
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
        <input type="text" class="searcher" autofocus on:focusout={() => {
            showValues = !showValues;
            clickOut = true;
        }}>
        {#each values as value}
            <button class="value" on:mousedown={selectHandler}>{value}</button>
        {/each}
    </div>
{/if}

<style>
    .main-button, .value, .searcher {
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

    .value {
        height: 50px;
        text-align: left;
    }
</style>