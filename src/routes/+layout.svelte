<script>
	import Layout from '../components/Layout.svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import '../global.css';
    export let data;

    function searchHandler(e) {
        goto('/results/' + e.detail.product, {replaceState: true});
    }
</script>

{#if $page.route.id !== '/checkout/[postId]'}
    <Layout login={data.authenticated} products={data.products} on:search={searchHandler}>
        <slot />
    </Layout>
{:else}
    <slot />
{/if}