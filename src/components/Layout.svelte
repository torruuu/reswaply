<script>
    import Footer from "./Footer.svelte";
import Results from "./Results.svelte";
    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    export let products = '';
    export let login = false;
    let filteredText = '';
    let inputFocus = false;

    function searchHandler(e) {
        filteredText = '';
        dispatch("search", {
            product: e.detail.product
        });
    }

</script>

<div class="margin"></div>

<div class="main-container">
    <div class="container">
        <div class="logo">
            <a class="logo-content" href="/">
                <img src="/images/logo-reswaply.png" alt="Logo">
                <span>Swaply</span>
            </a>
        </div>
    
        <input type="text" class="search-bar" placeholder="¿Qué andas buscando?" bind:value={filteredText} on:focusin={() => inputFocus = true} on:focusout={() => inputFocus = false}>
    
        <div class="buttons">
            {#if login}
                <a href="/profile/favorites">Favoritos</a>
                <a href="/profile/products">Profile</a>
                <a href="/upload" class="product">Subir producto</a>
            {:else}
                <a href="/login">Log in</a>
                <a href="/register">Registrar</a>
            {/if}
        </div>
    
        {#if filteredText !== "" && inputFocus}
            <div class="results">
                <Results products={products} filteredText={filteredText} on:search={searchHandler}/>
            </div>
        {/if}
    
    </div>
    
    <div class="content">
        <slot />
    </div>
    
    <div class="footer">
        <Footer />
    </div>
</div>

<style>
    /* .search-div {
        background-color: aqua;
        flex: 1;
        display: flex;
        flex-direction: column;
    } */

    .main-container {
        display: flex;
        flex-direction: column;
        min-height: calc(100vh - 5rem);
        justify-content: space-between;
    }

    .margin {
        height: 5rem;
    }

    .container {
        position: fixed;
        z-index: 1;
        top: 0;
        display: grid;
        column-gap: 2rem;
        width: 100%;
        grid-template-columns: min-content auto min-content;
        grid-template-rows: 5rem auto;
        
        background-color: #fff;
        border-bottom: 0.1rem solid rgb(205, 205, 205);
        padding: 0 2rem;
    }

    img {
        width: 2rem;
    }
    
    input {
        height: 2rem;
        border-radius: 10px;
        border: 1px solid #000;
        align-self: center;
        padding-left: 1rem;
    }

    input:focus {
        outline: none;
    }

    a {
        text-decoration: none;
        font-weight: 600;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2.5rem;
        width: max-content;
    }

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .logo-content {
        /* background-color: blueviolet; */
        display: inline-flex;
        align-items: center;
        justify-content: center;
    }

    .logo-content span {
        font-size: 2rem;
    }

    .product {
        color: #fff;
        background-color: #000;
        border-radius: 10px;
        padding: 0.5rem;
    }

    .results {
        margin-top: -1.4rem;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        position: relative;
    }

</style>