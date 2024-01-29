<script>
    import { createEventDispatcher } from "svelte";
    export let products = '';
    export let filteredText = '';

    let dispatch = createEventDispatcher();

    let resultadosFiltrados = [];
    let uniqueNames = [];

    $: {
        uniqueNames = [];

        resultadosFiltrados = products.filter(product => {
            const normalizedProductName = (product.name).toLowerCase();
            return normalizedProductName.includes(filteredText);
        }).filter(product => {
            if (!uniqueNames.includes(product.name)) {
                uniqueNames.push(product.name);
                return true;
            }
            return false;
        });

        // Tomar hasta 5 resultados
        resultadosFiltrados = resultadosFiltrados.slice(0, 5);

        // Completar con productos adicionales si no hay suficientes resultados
        if (resultadosFiltrados.length < 5) {
            let cantidad = 5 - resultadosFiltrados.length;
            let productosAdicionales = obtenerProductosAdicionales(cantidad);
            resultadosFiltrados = resultadosFiltrados.concat(productosAdicionales);
        }
    }

    function obtenerProductosAdicionales(cantidad) {
        let resultadosMarca = products.filter(product => {
            const normalizedBrand = (product.brand).toLowerCase();  // Asegúrate de usar la marca normalizada
            return normalizedBrand.includes(filteredText);
        });

        resultadosMarca = resultadosMarca.filter(product => {
            return !resultadosFiltrados.includes(product) && !uniqueNames.includes(product.name);
        }).filter(product => {
            if (!uniqueNames.includes(product.name)) {
                uniqueNames.push(product.name);
                return true;
            }
            return false;
        });

        if (resultadosMarca.length >= cantidad) {
            return resultadosMarca.slice(0, cantidad);
        }

        let resultadosExtra = products.filter(product => {
            const normalizedProductName = (product.name).toLowerCase();
            const normalizedProductBrand = (product.brand).toLowerCase();
            return !normalizedProductName.includes(filteredText) && !normalizedProductBrand.includes(filteredText) && !uniqueNames.includes(product.name);
        });

        return resultadosMarca.concat(resultadosExtra).slice(0, cantidad);
    }
</script>

<div class="container">
    {#each resultadosFiltrados as product}
        <button class="product" on:mousedown={(e) => {
            if(e.button === 0) {
                dispatch("search", {
                    product: product.name
                })
            }
        }}>
            <img src={product.img} alt={product.name}>
            <span>{product.name}</span>
        </button>
    {/each}
</div>

<style>
    .container {
        width: 100%;
        height: 25rem;
        background-color: #fff;
        position: absolute;
        border-radius: 10px;
        border: 1px solid #000;
        
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(5, 1fr);
    }

    img {
        height: 50px;
        width: auto;
    }

    button {
        background-color: transparent;
        margin: 0;
        padding: 0;
        border: none;
        cursor: pointer;
    }

    button:hover {
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    .product {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding-left: 1rem;
        border-radius: 10px;
    }
</style>