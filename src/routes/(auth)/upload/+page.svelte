<script>
	import Select from "../../../components/Select.svelte";

  export let data;
  let products = data.products;
  let conditions = data.conditions;

  let buttonDisabled = true;

  let categorySelected;
  let brandSelected;
  let productSelected;
  let conditionSelected;

  let uniqueBrands = new Set();
  let brands = [];

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
    products = orderArrayByRegex(products.map(item => item.name), inputValue)
      .map(name => {
      return products.find(item => item.name === name);
    });
  }

  function searchCondition(e) {
    let inputValue = e.detail.value;
    if (inputValue === '') {
      return conditions = data.conditions;
    }
    conditions = orderArrayByRegex(conditions.map(item => item.state), inputValue)
      .map(state => {
      return conditions.find(item => item.state === state);
    });
  }

  function categoryHandler() {
    products = products = data.products;
    products = products.filter(product => product.category === categorySelected);
    uniqueBrands.clear();
    products.forEach(product => uniqueBrands.add(product.brand));

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
  }
</script>

<div class="main-container">

  <form>
    <div class="form-content">
      <h2>Sube tu producto</h2>

      <div class="category-content">
        <h3>Tipo de producto</h3>
        <div class="category-buttons">
          <label class="category-button">
            <input type="radio" name="category" value="consoles" bind:group={categorySelected} on:change={categoryHandler}>
            <i class="fa-solid fa-gamepad"></i>
            <span>Consola</span>
          </label>
          <label class="category-button">
            <input type="radio" name="category" value="mobiles" bind:group={categorySelected} on:change={categoryHandler}>
            <i class="fa-solid fa-mobile-screen-button"></i>
            <span>Móvil</span>
          </label>
          <label class="category-button">
            <input type="radio" name="category" value="tablets" bind:group={categorySelected} on:change={categoryHandler}>
            <i class="fa-solid fa-tablet-screen-button"></i>
            <span>Tablet</span>
          </label>
        </div>
      </div>
      
      <div class="product-content">
        <h3>Información básica</h3>
        <h5>Marca</h5>
        {#key categorySelected}
          <Select placeholder={'Ej: Apple'} enabled={categorySelected !== undefined} bind:selectedValue={brandSelected} on:search={searchBrand} on:exit={() => {
            brands = orderArrayByRegex(brands, '');
          }}>
            {#each brands as value}
              <button class="value" on:mousedown={(e) => {
                if (e.button === 0) {
                  brandSelected = value;
                  products = products
                    .filter(product => product.brand === brandSelected);
                }
                console.log('mousedown');
              }}>{value}</button>
            {/each}
          </Select>

          <h5>Producto</h5>
          {#key brandSelected}
            <Select placeholder={'Ej: Iphone'} enabled={brandSelected !== undefined} bind:selectedValue={productSelected} on:search={searchProduct} on:exit={() => {
              products = data.products;
              products = products
                .filter(product => product.brand === brandSelected);
            }}>
              {#each products as value}
                <button class="value" on:mousedown={(e) => {
                  if (e.button === 0) {
                    productSelected = value.name;
                  }
                }}>{value.name}</button>
              {/each}
            </Select>
          {/key}
        {/key}
      </div>

      <div class="detail-content">
        {#key productSelected}
          <h3>Información del producto</h3>
          <h5>Estado del producto</h5>
          <Select placeholder={'Escoge un estado'} bind:selectedValue={conditionSelected} on:search={searchCondition}
          on:exit={() => {
            conditions = data.conditions;
          }}>
            {#each conditions as {state, description}}
                <button class="value" on:mousedown={(e) => {
                  if (e.button === 0) {
                    conditionSelected = state;
                  }
                }}>{state} {description}</button>
              {/each}
          </Select>

          <div class="price">
            <h5>Precio</h5>
            <h5>Moneda</h5>
            <input type="number" placeholder="Sé razonable...">
            <span>€</span>
          </div>

          <h5>Descripción del producto</h5>
          <textarea name="description" id="description" cols="30" rows="10" placeholder="Cuéntanos más. ¿Usado o nuevo? ¿Rojo o amarillo? ¿Tiene algún golpecito?"></textarea>
        {/key}
      </div>

      <button disabled={buttonDisabled} class="submit">Subir Producto</button>
    </div>
      
  </form>
</div>

<style>
  .main-container {
    width: 100%;
    height: max-content;
    display: flex;
    justify-content: center;
  }

  .form-content {
    display: grid;
    grid-template-columns: 35rem;
    gap: 1.5rem;
    margin-bottom: 4rem;
  }

  h2 {
    font-size: 2rem;
    margin: 2rem 0 0;
  }

  .category-content, .product-content, .detail-content {
    background-color: #fff;
    padding: 1rem;
    border: 0.1rem solid rgb(205, 205, 205);
    border-radius: 0.5rem;
  }

  .product-content, .detail-content {
    display: flex;
    flex-direction: column;
  }

  .category-content span {
    font-size: 0.7rem;
    text-transform: uppercase;
    font-weight: bold;
  }

  h3 {
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0 0 0.5rem;
  }

  h5 {
    font-size: 1rem;
    font-weight: 600;
    margin: 1rem 0 0.8rem;
  }

  .category-buttons {
    display: flex;
    justify-content: space-between;
  }

  input[type="radio"] {
    display: none;
  }

  .fa-solid {
    background-color: rgb(235, 235, 235);
    color: rgb(190, 190, 190);
    border-radius: 0.9rem;
    width: 10rem;
    height: 7rem;
    font-size: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .category-button {
    display: inline-block;
    cursor: pointer;
    display: grid;
    align-items: center;
    justify-items: center;
    gap: 0.4rem;
  }

  .category-button:hover .fa-solid {
    border: 0.2rem solid #000;
    color: #000;
  }

  input[type="radio"]:checked + .fa-solid {
    background-color: #000;
    color: #fff;
  }

  .value {
    width: 100%;
    height: 50px;
    text-align: left;
    cursor: pointer;
    border: none;
    background-color: transparent;
    border-top: 0.1rem solid rgb(205, 205, 205);
    padding-left: 0.3rem;
  }

  .price {
    display: grid;
    grid-template-columns: 8fr 2fr;
    column-gap: 2rem;
  }

  .price span {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.1rem solid rgb(205, 205, 205);
  }

  input[type="number"] {
    height: 50px;
    font-size: 1rem;
    padding: 0 0.8rem;
  }

  input[type="number"], .price span {
    border: 0.1rem solid rgb(205, 205, 205);
    border-radius: 0.5rem;
  }

  textarea {
    font-size: 1rem;
    border: 0.1rem solid rgb(205, 205, 205);
    border-radius: 0.5rem;
    padding: 0.4rem 0.8rem;
    min-width: 100%;
    max-width: 100%;
    height: 200px;
    min-height: 200px;
  }

  .submit {
    height: 50px;
    border-radius: 2rem;
    border: none;
    background-color: #000;
    color: #fff;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
  }
</style>