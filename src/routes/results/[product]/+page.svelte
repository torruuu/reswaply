<script>
    import Filter from '../../../components/Filter.svelte';
    import Preview from '../../../components/Preview.svelte';
	import PriceRange from '../../../components/PriceRange.svelte';

    export let data;

    let postsSearched;
    let similarPosts;
    let productSearched;
    let numberResults;

    let allStorages;
    let allColors;
    let allConditions;

    let filteredStorages = [];
    let filteredColors = [];
    let filteredConditions = [];

    let showDeleteFilter = false;
    let resetFilters = true;

    let min;
    let max;

    $: {
        postsSearched = data.postsSearched;
        similarPosts = obtenerElementosAleatorios(data.similarPosts, 15);
        productSearched = data.product;

        allStorages = data.allStorages;
        allColors = data.allColors;
        allConditions = data.allConditions;

        if (filteredStorages.length > 0) {
            postsSearched = postsSearched.filter(post => filteredStorages.includes(post.product.storage));
        }

        if (filteredColors.length > 0) {
            postsSearched = postsSearched.filter(post => filteredColors.map(color => color.toLowerCase()).includes(post.product.color));
        }

        if (filteredConditions.length > 0) {
            postsSearched = postsSearched.filter(post => filteredConditions.includes(post.condition));
        }

        if (max !== undefined && min !== undefined) {
            postsSearched = postsSearched.filter(post => parseFloat(post.price) <= max && parseFloat(post.price) >= min);
        }

        if (filteredStorages.length > 0 || filteredColors.length > 0 || filteredConditions.length > 0 || max !== undefined || min !== undefined) {
            showDeleteFilter = true;
        } else {
            showDeleteFilter = false;
        }
        
        numberResults = postsSearched.length;
    }


    function obtenerElementosAleatorios(array, cantidad) {
        // Si el array es más largo que la cantidad deseada, recórtalo
        if (array.length > cantidad) {
            array = array.slice(); // Copia el array original para no modificarlo
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)); // Genera un índice aleatorio
                [array[i], array[j]] = [array[j], array[i]]; // Intercambia elementos aleatoriamente
            }
            array = array.slice(0, cantidad); // Recorta el array a la cantidad deseada
        }
        return array; // Devuelve el array con elementos aleatorios
    }

    function deleteFilters() {
        filteredStorages = [];
        filteredColors = [];
        filteredConditions = [];
        max = undefined;
        min = undefined;
        resetFilters = !resetFilters;
    }

    function priceFilter(e) {
        max = e.detail.maxFilter;
        min = e.detail.minFilter;
    }

</script>


<div class="container">
    <h2>Tú busqueda: {productSearched}</h2>
    <div class="subtitle">
        <h3 class="results">{numberResults} {numberResults > 1 ? 'productos' : 'producto'}</h3>
        {#if showDeleteFilter}
            <button on:click={deleteFilters} class="delete">Borrar todos los filtros</button>
        {/if}
    </div>
    <div class="content" class:no-results={!data.postsSearched.length > 0}>
        {#if data.postsSearched.length > 0}
            <div class="filters">
                {#key productSearched}
                    {#key resetFilters}
                        <PriceRange
                        label='Precio'
                        posts={data.postsSearched}
                        on:change={priceFilter}
                        on:mount={() => {
                            max = undefined;
                            min = undefined;
                        }}
                        />
                    {/key}

                    <Filter
                    bind:resetFilters bind:checkedValues={filteredStorages} title={'Almacenamiento (GB)'} params={allStorages} extraTxt={' GB'}
                    />

                    <Filter
                    bind:resetFilters bind:checkedValues={filteredColors} title={'Color'} params={allColors}
                    />

                    <Filter
                    bind:resetFilters bind:checkedValues={filteredConditions} title={'Condición'} params={allConditions}
                    />
                {/key}
            </div>
        {/if}
        <div class="rigth-content">
            {#if numberResults > 0}
            <div class="posts">
                {#key productSearched}
                    {#each postsSearched as post}
                        <Preview {post} />
                    {/each}
                {/key}
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
        </div>
        
    </div>


    <div class="similar-container">
        <h2>Productos similares</h2>
        <div class="similar-content">
            {#key productSearched}
                {#each similarPosts as post}
                    <Preview {post} />
                {/each}
            {/key}
        </div>
    </div>
</div>


<style>
    .container {
        margin: 2rem auto 5rem;
        width: 65%;
    }

    h2 {
        font-size: 2.2rem;
    }

    .subtitle {
        display: flex;
        align-items: center;
        gap: 2rem;
    }

    .subtitle button {
        border: none;
        height: max-content;
        margin: 0;
        border: 0;
        background: none;
        font-size: 1rem;
        font-weight: 500;
        text-decoration: underline;
        cursor: pointer;
    }

    .results {
        width: max-content;
        font-size: 1.2rem;
        font-weight: 400;
        background-color: rgb(205, 205, 205);
        padding: 0.5rem 1rem;
        border-radius: 2rem;
    }

    .content {
        margin-top: 3rem;
        width: 100%;
        display: grid;
        grid-template-columns: 3fr 7fr;
    }

    .no-results {
        grid-template-columns: 1fr;
    }

    .posts {
        /* background-color: aquamarine; */
        display: grid;
        grid-template-columns: repeat(auto-fill, 17rem);
        justify-content: space-between;
        row-gap: 2rem;
    }

    .filters {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    .similar-container {
        margin-top: 10rem;
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