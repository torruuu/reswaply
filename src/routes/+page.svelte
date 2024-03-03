<script>
    import Preview from '../components/Preview.svelte';
    export let data;

    const posts = data.filteredPosts;
</script>

{#if data.authenticated}
    <h1>Bienvenido {data.userName}</h1>
{/if}

{#each posts as post}
    <Preview {post} />
{/each}