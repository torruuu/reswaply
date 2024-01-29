<script>
	import Select from "../../../components/Select.svelte";

    export let data;
    const products = data.products;

    let categorySelected;
    let brandSelected;

    let uniqueBrands = new Set();
    let brands = [];

    let filteredProducts;

    // Actualiza el Set de marcas únicas
    $: {
        filteredProducts = products.filter(product => product.category === categorySelected);
        uniqueBrands.clear();
        filteredProducts.forEach(product => uniqueBrands.add(product.brand));

        brands = uniqueBrands;
    }
</script>

<h2>Sube tu producto</h2>

<form>
    <h3>Tipo de producto</h3>
    <label>
      <input type="radio" name="category" value="consoles" bind:group={categorySelected}> Consolas
    </label>
    <label>
      <input type="radio" name="category" value="mobiles" bind:group={categorySelected}> Móviles
    </label>
    <label>
      <input type="radio" name="category" value="tablets" bind:group={categorySelected}> Tablets
    </label>
    
    <h3>Marca</h3>
    {#key categorySelected}
        <Select values={brands} enabled={categorySelected !== undefined}/>
    {/key}
</form>

<style>

</style>