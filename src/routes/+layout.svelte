<script>
    import '../global.css';
    export let data;
</script>

<nav>
    <a href="/">Home</a>
    {#if data.registrado}
        <a href="/profile/products">Profile</a>
    {:else}
        <a href="/login">Log in</a>
        <a href="/register">Register</a>
    {/if}
</nav>

<slot />