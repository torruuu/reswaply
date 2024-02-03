<script>
    import Preview from '../../../components/Preview.svelte';

    export let data;
</script>

{#key data.posts}
    {#each data.posts as post}
        <Preview {post} />
    {/each}
{/key}