<script>
	import Alert from "../../../components/Alert.svelte";
    import UserProduct from "../../../components/UserProduct.svelte";

    export let data;
    export let form;
    let showUploadAlert = data.showAlert;
    let showErrorForm = form?.error;
    let showSuccessForm = form?.success;
</script>

{#if showUploadAlert}
    <Alert title={'Éxito'} description={'Producto añadido con éxito'} on:close={() => showUploadAlert = false}/>
{/if}

{#if showErrorForm}
    <Alert type={'error'} title={form.title} description={form.message} on:close={() => showErrorForm = false}/>
{/if}

{#if showSuccessForm}
    <Alert title={form.title} description={form.message} on:close={() => showSuccessForm = false}/>
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