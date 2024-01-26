<script>
	import Header from '../components/Header.svelte';
    import '../global.css';
    export let data;

    console.log(data.products);
</script>

<Header login={data.authenticated} products={data.products}>
    <slot />
</Header>