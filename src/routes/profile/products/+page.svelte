<script>
	import Alert from "../../../components/Alert.svelte";
    import UserProduct from "../../../components/UserProduct.svelte";

    export let data;
    let showAlert = data.showAlert;
</script>

{#if showAlert}
    <Alert title={'Éxito'} description={'Producto añadido con éxito'} on:close={() => showAlert = false}/>
{/if}

<div class="container">
    {#if data.userPosts.length !== 0}
        <div class="posts">
            {#each data.userPosts as post}
                <UserProduct post={post}/>
            {/each}
        </div>
    {:else}
        <h2>No tiene productos en venta</h2>
    {/if}
</div>

<style>
    .container {
        margin-top: 2rem;
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .posts {
        width: 70rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
</style>