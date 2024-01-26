<script>
    import Preview from '../../../components/Preview.svelte';

    export let data;

    console.log(data.posts);
</script>

<p>HOLA</p>

{#each data.posts as post}
    <Preview {post} />
{/each}