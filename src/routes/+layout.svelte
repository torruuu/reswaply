<script>
	import Header from '../components/Header.svelte';
    import '../global.css';
    export let data;
</script>

<Header login={data.authenticated}>
    <slot />
</Header>