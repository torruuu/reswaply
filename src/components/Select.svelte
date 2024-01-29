<script>
    export let values;
    export let enabled = true;
    let showValues = false;
    let selectedValue;
</script>

<button disabled={!enabled} on:click={() => showValues = !showValues}
    class:active={showValues}
    class="main-button">
    {selectedValue ? selectedValue : "Ej:Apple"}
</button>

{#if showValues}
    <div class="values">
        <input type="text" class="searcher" autofocus on:focusout={() => showValues = !showValues}>
        {#each values as value}
            <button class="value" on:mousedown={(e) => {
                if(e.button === 0) {
                    selectedValue = value;
                    showValues = !showValues;
                }
            }}>{value}</button>
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