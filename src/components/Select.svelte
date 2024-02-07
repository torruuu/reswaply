<script>
	import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";

    export let enabled = true;
    export let selectedValue;
    export let placeholder = "Select";
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

<div class="container">
    <button type="button" disabled={!enabled} on:click={() => {
        if (clickOut) {
            showValues = false;
            clickOut = false;
            return;
        }
        showValues = !showValues;
    }}
        class:active={showValues}
        class="main-button">
        <div class="text-value">
            <span class:placeholder={!selectedValue}>{selectedValue ? selectedValue : placeholder}</span>
        </div>
        <div class="icon">
            <i class="fa-solid fa-chevron-down"></i>
        </div>
    </button>
    
    {#if showValues}
        <div class="values">
            <input type="text" class="searcher" bind:value={inputValue} autofocus on:input={searchHandler} on:focusout={focusoutHandler}>
            <slot />
        </div>
    {/if}
</div>

<style>
    .container {
        position: relative;
        width: auto;
    }

    .main-button, .searcher {
        margin: 0;
        padding: 0;
        width: 100%;
    }

    .main-button {
        font-size: 1rem;
        position: relative;
        width: 100%;
        height: 50px;
        text-align: left;
        padding: 0 0.8rem;
        display: grid;
        grid-template-columns: 95% 5%;
        align-items: center;
        background-color: #fff;
        cursor: pointer;
        border: 0.1rem solid rgb(205, 205, 205);
        border-radius: 0.5rem;
    }

    .main-button:disabled {
        background-color: rgb(190, 190, 190);
        cursor: auto;
        border: none;
    }

    .active {
        border: 1px solid black;
    }

    .values {
        background-color: #fff;
        border: 0.1rem solid rgb(205, 205, 205);
        border-top: none;
        border-radius: 0 0 0.5rem 0.5rem;
        width: 100%;
        height: auto;
        max-height: 240px;

        overflow: auto;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1;
    }

    .searcher {
        padding-left: 0.3rem;
        border: none;
        outline: none;
        height: 30px;
    }

    .placeholder {
        color: #999;
    }
</style>