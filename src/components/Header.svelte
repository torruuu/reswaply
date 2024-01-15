<script>
    export let login = false;
</script>

<nav>
    <a href="/" class="logo">
        <div class="logo-content">
            <img src="/images/logo-reswaply.png" alt="Logo">
            <span>Swaply</span>
        </div>
    </a>
    <input type="text" class="search-bar" placeholder="  ¿Qué andas buscando?">
    {#if login}
        <a href="/profile/products">Favoritos</a>
        <a href="/profile/products">Profile</a>
        <a href="/profile/products" class="product">Subir producto</a>
    {:else}
        <a href="/login">Log in</a>
        <a href="/register">Register</a>
    {/if}
</nav>

<style>
    nav {
        display: flex;
        gap: 2rem;
        padding: 1rem 2rem;
        align-items: center;
        background-color: #fff;
    }

    img {
        width: 2rem;
    }
    
    input {
        flex: 1;
        height: 2rem;
        border-radius: 10px;
        border: 1px solid #000;
    }

    a {
        text-decoration: none;
    }

    .logo-content {
        display: flex;
        align-items: center;
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
</style>