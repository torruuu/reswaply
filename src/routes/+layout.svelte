<script>
	import Header from '../components/Header.svelte';
    import { goto } from '$app/navigation';
    import '../global.css';
    export let data;

    function searchHandler(e) {
        goto('/results/' + e.detail.product, {replaceState: true});
    }
</script>

<Header login={data.authenticated} products={data.products} on:search={searchHandler}>
    <slot />
</Header>