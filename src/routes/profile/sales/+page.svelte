<script>
    import NoFound from '../../../components/NoFound.svelte';
    import ProfileDescription from '../../../components/ProfileDescription.svelte';
    import SoldProduct from '../../../components/SoldProduct.svelte';

    export let data;
    const visualizer = data.userName;
</script>

<ProfileDescription title={'Ventas'} description={'Consulta las ventas realizadas'} />

<div class="container">
    {#if data.userPosts.length !== 0}
        <div class="posts">
            {#each data.userPosts as post}
                <SoldProduct post={post} visualizer={visualizer} />
            {/each}
        </div>
    {:else}
        <NoFound description={'¡Aún no has vendido nada en Reswaply'} buttonValue={'¡Empieza a vender!'} redirect={'/upload'} />
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