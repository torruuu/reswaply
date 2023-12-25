<script>
    export let data;
    console.log(data);
</script>

{#if data.userPosts.length !== 0}
    {#each data.userPosts as post}
        <p>{post.description}</p>
    {/each}
{:else}
    <h2>No tiene productos en venta</h2>
{/if}
