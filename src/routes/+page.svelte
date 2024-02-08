<script>
    import Preview from '../components/Preview.svelte';
    export let data;
</script>

{#if data.authenticated}
    <h1>Bienvenido {data.userName}</h1>
{/if}

{#each data.posts as post}
    <Preview {post} />
{/each}