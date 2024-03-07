<script>
	import RangeSlider from 'svelte-range-slider-pips';
    import { createEventDispatcher, onMount } from 'svelte';

	export let label = '';
    export let posts;
    export let max = getMaxPrice(posts);
    export let min = 0;

    let values = [min, max];
    let dispatch = createEventDispatcher();

    onMount(() => {
        dispatch('mount');
    })

    function stopHandler(e) {
        dispatch('change', {
            minFilter: e.detail.values[0],
            maxFilter: e.detail.values[1]
        })
    }

    function getMaxPrice(products) {
        if (products.length === 0) {
            return null; // Retorna null si la lista de productos está vacía
        }

        return products.reduce((maxPrice, product) => {
            const price = parseFloat(product.price);
            return isNaN(price) ? maxPrice : Math.max(maxPrice, price);
        }, parseFloat(products[0].price));
    }
</script>

<div class="container">
    <h3 class="filtro__titulo">{label}</h3>

    <div class="slider">
        <RangeSlider id='sliderRange' min={min} max={max} range={true} bind:values={values} on:stop={stopHandler} />
    </div>

    <div class="values">
        <div class="filtro__range-value">
            <h6>Mín. (€)</h6>
            <span>{values[0]}</span>
        </div>
        <div class="filtro__range-value">
            <h6>Máx. (€)</h6>
            <span>{values[1]}</span>
        </div>
    </div>
</div>

<style>

	.container {
		max-width: 20rem;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.filtro__titulo {
		margin: 0 0 1rem;
		font-weight: 700;
	}

    .slider {
        display: flex;
        justify-content: center;
        align-items: center;
    }

	.values {
		display: flex;
		justify-content: space-between;
	}

	.filtro__range-value {
		background-color: #fff;
		padding: 0.3rem 0.5rem;
		border: 0.1rem solid rgb(205, 205, 205);
		border-radius: 0.5rem;
	}

	.filtro__range-value h6 {
		margin: 0;
		font-size: 0.7rem;
		font-weight: 300;
	}

	.filtro__range-value span {
		font-weight: 400;
		font-size: 1rem;
	}

	:root {
    --range-slider:            hsl(180, 3.9%, 84.9%);
    --range-handle-inactive:   hsl(0, 0%, 0%);
    --range-handle:            hsl(0, 0%, 0%);
    --range-handle-focus:      hsl(0, 0%, 0%);
    --range-handle-border:     hsl(0, 0%, 27.5%);
    --range-range-inactive:    hsl(0, 0%, 0%);
    --range-range:             hsl(0, 0%, 0%);
    }

	:global(#sliderRange) {
		font-size: 0.5rem;
		width: 90%;
		padding: 0;
		margin: 0;
	}

	:global(#sliderRange .rangeHandle) {
		height: 1.4rem;
		width: 1.4rem;
	}

	:global(#sliderRange .rangeNub) {
		background-color: #fff;
		border-radius: 0.5rem;
		transform: rotate(0);
		border: 0.1rem solid #000;
	}
</style>