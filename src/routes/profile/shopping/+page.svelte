<script>
    export let data;
</script>

{#if data.userPosts.length !== 0}
    {#each data.userPosts as post}
        <p>{post.description}</p>
    {/each}
{:else}
    <h2>No tienes compras todavía</h2>
{/if}