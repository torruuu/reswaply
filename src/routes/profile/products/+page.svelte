<script>
	import Alert from "../../../components/Alert.svelte";
    import NoFound from "../../../components/NoFound.svelte";
	import ProfileDescription from "../../../components/ProfileDescription.svelte";
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

<ProfileDescription title={'Productos'} description={'Consulta y modifica tus productos'} />

<div class="container">
    {#if data.userPosts.length !== 0}
        <div class="posts">
            {#each data.userPosts as post}
                <UserProduct post={post}/>
            {/each}
        </div>
    {:else}
        <NoFound description={'¡Aún no has subido nada a Reswaply'} buttonValue={'¡Empieza a vender!'} redirect={'/upload'} />
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