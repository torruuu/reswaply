<script>
    import Preview from '../components/Preview.svelte';
    export let data;

    const mobiles = data.mobilePosts;
    const tablets = data.tabletPosts;
    const consoles = data.consolePosts;

</script>

<div class="container">
    <div class="content">

        <div class="mobiles">
            <h2>Smartphones</h2>
            <div class="posts-content">
                {#each mobiles as post}
                    <Preview {post} />
                {/each}
                {#each mobiles as post}
                    <Preview {post} />
                {/each}
                {#each mobiles as post}
                    <Preview {post} />
                {/each}
            </div>
        </div>

        <div class="mobiles">
            <h2>Tablets</h2>
            <div class="posts-content">
                {#each tablets as post}
                    <Preview {post} />
                {/each}
            </div>
        </div>

        <div class="mobiles">
            <h2>Consolas</h2>
            <div class="posts-content">
                {#each consoles as post}
                    <Preview {post} />
                {/each}
            </div>
        </div>
    </div>
</div>

<style>
    .container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 5rem;
    }

    .content {
        width: 70%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .posts-content {
        display: flex;
        gap: 2rem;
        overflow: auto;
        padding-bottom: 1rem;

        scrollbar-color: #000;
    }

    .posts-content::-webkit-scrollbar {
        height: 0.5rem; /* width of the entire scrollbar */
    }

    .posts-content::-webkit-scrollbar-track {
        background: none; /* color of the tracking area */
    }

    .posts-content::-webkit-scrollbar-thumb {
        background-color: #000; /* Cambia el color del thumb */
        border-radius: 6px;
    }
</style>