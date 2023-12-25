<script>
    export let data;
</script>

{#if data.registrado}
    <h1>Bienvenido {data.userName}</h1>
{/if}

{#each data.posts as post}
    <p>{post.description}</p>
{/each}