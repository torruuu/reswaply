<script>
    export let data;
</script>

<nav>
    <a href="/">Home</a>
    {#if data.registrado && data.registrado !== ''}
        <a href="/profile">Profile</a>
    {:else}
        <a href="/login">Log in</a>
    {/if}
</nav>

<slot />