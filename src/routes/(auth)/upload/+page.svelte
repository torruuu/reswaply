<script>
	import Select from "../../../components/Select.svelte";

  export let data;
  const products = data.products;

  let buttonDisabled = true;

  let categorySelected;
  let brandSelected;
  let productSelected;

  let uniqueBrands = new Set();
  let brands = [];
  let filteredProducts;

  function orderArrayByRegex(array, searchString) {
    if (searchString.trim() === '') {
      // Ordenar alfabéticamente si searchString está vacío
      return array.slice().sort((a, b) => a.localeCompare(b));
    }

    const regex = new RegExp(searchString, 'i');
    const matchingValues = array.filter(value => regex.test(value));
    const nonMatchingValues = array.filter(value => !regex.test(value));

    return matchingValues.concat(nonMatchingValues);
  }

  function searchBrand(e) {
    let inputValue = e.detail.value;
    brands = orderArrayByRegex(brands, inputValue);
  }

  function searchProduct(e) {
    let inputValue = e.detail.value;
    filteredProducts = orderArrayByRegex(filteredProducts, inputValue);
  }

  function categoryHandler() {
    filteredProducts = products.filter(product => product.category === categorySelected);
    uniqueBrands.clear();
    filteredProducts.forEach(product => uniqueBrands.add(product.brand));

    brands = [...uniqueBrands];
    brands = orderArrayByRegex(brands, '');
  }

  // Actualiza el Set de marcas únicas
  $: {
    if (productSelected) {
      buttonDisabled = false;
    } else {
      buttonDisabled = true;
    }
    console.log(filteredProducts);
  }
</script>

<h2>Sube tu producto</h2>

<form>
  <h3>Tipo de producto</h3>
  <label>
    <input type="radio" name="category" value="consoles" bind:group={categorySelected} on:change={categoryHandler}> Consolas
  </label>
  <label>
    <input type="radio" name="category" value="mobiles" bind:group={categorySelected} on:change={categoryHandler}> Móviles
  </label>
  <label>
    <input type="radio" name="category" value="tablets" bind:group={categorySelected} on:change={categoryHandler}> Tablets
  </label>
  
  <h3>Marca</h3>
  {#key categorySelected}
    <Select enabled={categorySelected !== undefined} bind:selectedValue={brandSelected} on:search={searchBrand} on:exit={() => {
      brands = orderArrayByRegex(brands, '');
    }}>
      {#each brands as value}
        <button class="value" on:mousedown={(e) => {
          if (e.button === 0) {
            brandSelected = value;
            filteredProducts = filteredProducts
              .filter(product => product.brand === brandSelected)
              .map(product => product.name);
            filteredProducts = orderArrayByRegex(filteredProducts, '');
          }
          console.log('mousedown');
        }}>{value}</button>
      {/each}
    </Select>

    <h3>Producto</h3>
    {#key brandSelected}
      <Select enabled={brandSelected !== undefined} bind:selectedValue={productSelected} on:search={searchProduct} on:exit={() => {
        filteredProducts = orderArrayByRegex(filteredProducts, '');
      }}>
        {#each filteredProducts as value}
          <button class="value" on:mousedown={(e) => {
            if (e.button === 0) {
              productSelected = value;
            }
          }}>{value}</button>
        {/each}
      </Select>
    {/key}
  {/key}

  <button disabled={buttonDisabled}>Subir Producto</button>
    
</form>

<style>
  .value {
    width: 100%;
    height: 50px;
    text-align: left;
  }
</style>