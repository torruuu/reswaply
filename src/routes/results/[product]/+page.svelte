<script>
    import Preview from '../../../components/Preview.svelte';

    export let data;

    $: {
        postsSearched = data.postsSearched;
        similarPosts = data.similarPosts;
        productSearched = data.product;
        numberResults = postsSearched.length;
    }
    let postsSearched = data.postsSearched;
    let similarPosts = data.similarPosts;
    let productSearched = data.product;
    let numberResults = postsSearched.length;

    console.log(similarPosts);
</script>

{#key postsSearched}
<div class="container">
    <h2>Tú busqueda: {productSearched}</h2>
    {#if numberResults > 0}
        <h3 class="results">{numberResults} {numberResults > 1 ? 'productos' : 'producto'}</h3>
        <div class="posts">
            {#each postsSearched as post}
                <Preview {post} />
            {/each}
            {#each postsSearched as post}
                <Preview {post} />
            {/each}
            {#each postsSearched as post}
                <Preview {post} />
            {/each}
            {#each postsSearched as post}
                <Preview {post} />
            {/each}
            {#each postsSearched as post}
                <Preview {post} />
            {/each}
            {#each postsSearched as post}
                <Preview {post} />
            {/each}
            {#each postsSearched as post}
                <Preview {post} />
            {/each}
        </div>
    {:else}
        <div class="no-found">
            <div class="no-found-content">
                <div class="error-title">
                    <h3>Oops!...</h3>
                    <i class="fa-solid fa-face-sad-tear"></i>
                </div>
                <span>Parece que no hemos encontrado ningún producto que coincida con su búsqueda</span>
                <a href="/">Seguir explorando</a>
            </div>
        </div>
    {/if}
    <div class="similar-container">
        <h2>Productos similares</h2>
        <div class="similar-content">
            {#each similarPosts as post}
                <Preview {post} />
            {/each}
            {#each similarPosts as post}
                <Preview {post} />
            {/each}
            {#each similarPosts as post}
                <Preview {post} />
            {/each}
            {#each similarPosts as post}
                <Preview {post} />
            {/each}
            {#each similarPosts as post}
                <Preview {post} />
            {/each}
            {#each similarPosts as post}
                <Preview {post} />
            {/each}

        </div>
    </div>
</div>
{/key}

<style>
    .container {
        margin: 2rem auto 5rem;
        width: 65%;
    }

    h2 {
        font-size: 2.2rem;
    }

    .results {
        width: max-content;
        font-size: 1.2rem;
        font-weight: 400;
        background-color: rgb(205, 205, 205);
        padding: 0.5rem 1rem;
        border-radius: 2rem;
    }

    .posts {
        margin-top: 3rem;
        display: grid;
        grid-template-columns: repeat(auto-fill, 17rem);
        justify-content: space-between;
        row-gap: 2rem;
    }

    .similar-container {
        margin-top: 6rem;
    }

    .similar-content {
        display: flex;
        gap: 2rem;
        overflow: auto;
        padding-bottom: 1rem;

        scrollbar-color: #000;
    }

    .similar-content::-webkit-scrollbar {
        height: 0.5rem; /* width of the entire scrollbar */
    }

    .similar-content::-webkit-scrollbar-track {
        background: none; /* color of the tracking area */
    }

    .similar-content::-webkit-scrollbar-thumb {
        background-color: #000; /* Cambia el color del thumb */
        border-radius: 6px;
    }

    .no-found {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .no-found-content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .error-title {
        display: flex;
        gap: 2rem;
    }

    .no-found i {
        font-size: 4rem;
    }

    .no-found h3 {
        margin: 0;
        font-size: 4rem;
    }

    .no-found a {
        margin-top: 1rem;
        background-color: #000;
        color: #fff;
        width: 20rem;
        padding: 1.2rem 0;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        border-radius: 0.5rem;
    }

    .no-found a:hover {
        opacity: 0.6;
    }
</style>