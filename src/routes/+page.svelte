<script>
    import Carrusel from '../components/Carrusel.svelte';
import Preview from '../components/Preview.svelte';
    export let data;

    const mobiles = obtenerElementosAleatorios(data.mobilePosts, 15);
    const tablets = obtenerElementosAleatorios(data.tabletPosts, 15);
    const consoles = obtenerElementosAleatorios(data.consolePosts, 15);

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

</script>

<Carrusel />

<div class="container">
    <div class="content">

        <div class="mobiles">
            <h2>Smartphones</h2>
            <div class="posts-content">
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
        margin: 3rem 0 8rem;
    }

    .content {
        width: 70%;
        display: flex;
        flex-direction: column;
        gap: 6rem;
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