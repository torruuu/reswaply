<script>
	import Layout from '../components/Layout.svelte';
    import Alert from "../components/Alert.svelte";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import '../global.css';
    export let data;

    function searchHandler(e) {
        goto('/results/' + e.detail.product, {replaceState: true});
    }
</script>

{#if data.showUpdateAddress}
    <Alert title={'Éxito'} description={'Dirección actualizada con éxito'} on:close={() => data.showUpdateAddress = false}/>
{/if}

{#if data.showUpdateInfo}
    <Alert title={'Éxito'} description={'Datos personales actualizados con éxito'} on:close={() => data.showUpdateInfo = false}/>
{/if}

{#if $page.route.id !== '/checkout/[postId]' && $page.route.id !== '/login' && $page.route.id !== '/register'}
    <Layout login={data.authenticated} products={data.products} on:search={searchHandler}>
        <slot />
    </Layout>
{:else}
    <slot />
{/if}