<script>
	import NoFound from "../../../components/NoFound.svelte";
    import Preview from "../../../components/Preview.svelte";
    import ProfileDescription from "../../../components/ProfileDescription.svelte";

    export let data;

    const likedPosts = data.likedPosts;
</script>

<ProfileDescription title={'Favoritos'} description={'Consulta y accede a tus productos favoritos'} />

<div class="container">
    {#if likedPosts.length !== 0}
        <div class="products-content">
            {#each likedPosts as post}
                <Preview {post} />
            {/each}
            {#each likedPosts as post}
                <Preview {post} />
            {/each}
            {#each likedPosts as post}
                <Preview {post} />
            {/each}
            {#each likedPosts as post}
                <Preview {post} />
            {/each}
            {#each likedPosts as post}
                <Preview {post} />
            {/each}
            {#each likedPosts as post}
                <Preview {post} />
            {/each}
        </div>
    {:else}
        <NoFound title={'Nada por aquí... todavía'} description={'Guarda aquí tus favoritos para estar al día'} buttonValue={'Elige tus favoritos'} redirect={'/'} />
    {/if}
</div>

<style>
    .container {
        margin-top: 2rem;
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .products-content {
        width: calc(18rem * 4 + 8rem);
        max-height: 35rem;

        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
        justify-items: center;
        gap: 2rem;

        overflow: auto;
        padding-bottom: 0.5rem;
    }

    .products-content::-webkit-scrollbar {
        width: 0.5rem; /* width of the entire scrollbar */
    }

    .products-content::-webkit-scrollbar-track {
        background: none; /* color of the tracking area */
    }

    .products-content::-webkit-scrollbar-thumb {
        background-color: #000; /* color of the scroll thumb */
        border-radius: 20px; /* roundness of the scroll thumb */
    }
</style>