<script>
    import Results from "./Results.svelte";

    export let login = false;
    let filteredText = "";

</script>

<div class="container">
    <div class="logo">
        <a class="logo-content" href="/">
            <img src="/images/logo-reswaply.png" alt="Logo">
            <span>Swaply</span>
        </a>
    </div>

    <input type="text" class="search-bar" placeholder="¿Qué andas buscando?" bind:value={filteredText}>

    <div class="buttons">
        {#if login}
            <a href="/profile/products">Favoritos</a>
            <a href="/profile/products">Profile</a>
            <a href="/profile/products" class="product">Subir producto</a>
        {:else}
            <a href="/login">Log in</a>
            <a href="/register">Register</a>
        {/if}
    </div>

    {#if filteredText !== ""}
        <div class="results">
            <Results />
        </div>
    {/if}

    <div class="content">
        <slot />
    </div>

</div>

<style>
    /* .search-div {
        background-color: aqua;
        flex: 1;
        display: flex;
        flex-direction: column;
    } */

    .container {
        display: grid;
        column-gap: 2rem;
        grid-template-columns: 11rem auto min-content;
        grid-template-rows: 5rem auto;
        
        background-color: #fff;
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

    a {
        text-decoration: none;
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
        background-color: violet;
        height: 30rem;
        margin-top: -1.4rem;
        grid-column: 2 / 3;
        grid-row: 2 / 3;
        z-index: 1;
        border-radius: 10px;
        border: 1px solid #000;
    }

    .content {
        grid-column: 1 / -1;
        grid-row: 2 / -1;
    }

    .logo, .buttons {
        padding: 1rem 2rem;
    }
</style>