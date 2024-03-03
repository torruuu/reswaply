<script>
    export let data;

    const post = data.post;
    const shippingPrice = 6.49.toLocaleString('es-ES', { minimumFractionDigits: 2 });

    const productImg = post.product.img;
    const productName = post.product.name;
    const productStorage = post.product.storage;
    const productColor = capitalizeFirstLetter(post.product.color);
    const seller = post.seller;
    const price = post.price.toLocaleString('es-ES', { minimumFractionDigits: 2 });
    const total = (parseFloat(price.replace(",", ".")) + parseFloat(shippingPrice.replace(",", "."))).toLocaleString('es-ES', { minimumFractionDigits: 2 });
    const address = data.address;
    const cardNumber = data.cardNumber;
    const cardholder = data.cardholder;
    let buttonDisabled = true;
    let showSuccess = true;

    $: {
        if (address && cardNumber) {
            buttonDisabled = false;
        } else {
            buttonDisabled = true;
        }
    }

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
</script>

<div class="container">
    <div class="purchase-content">
        <h1>Tramitar pedido</h1>
        <div class="purchase-info">
            <div class="product-info">
                <h3>Producto</h3>
                <div class="product">
                    <div class="image">
                        <img src={productImg} alt={productName}>
                    </div>
                    <div class="description">
                        <h5>{productName}</h5>
                        <p>{productStorage} GB - {productColor}</p>
                    </div>
                    <div class="seller">
                        <h5>Vendido por:</h5>
                        <div class="seller-info">
                            <img class="user-image" src="/images/user.svg" alt="User">
                            {seller}
                        </div>
                    </div>
                </div>
            </div>
            <div class="address-info">
                <h3>Dirección de envio</h3>
                <div class="address-description">
                    <div class="address-logo">
                        <i class="fa-solid fa-house"></i>
                    </div>
                    {#if address}
                        <div class="address">
                            <p>{address?.street + ', ' + address?.number}</p>
                            <p>{address?.city + ', ' + address?.province}</p>
                        </div>
                        <div class="change">
                            <a href="/update-address">Cambiar</a>
                        </div>
                    {:else}
                        <div class="no-address">
                            <span>No tiene ninguna dirección asignada</span>
                        </div>
                        <div class="change">
                            <a href="/update-address">Añadir</a>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="line"></div>

            <div class="payment-method">
                <h3>Método de pago</h3>
                <div class="payment-description">
                    <div class="card-logo">
                        <i class="fa-regular fa-credit-card"></i>
                    </div>
                    {#if cardNumber}
                        <div class="card-info">
                            <p>{cardNumber}</p>
                            <p>{cardholder}</p>
                        </div>
                        <div class="change">
                            <a href="/update-card">Cambiar</a>
                        </div>
                    {:else}
                        <div class="no-card">
                            <span>No tiene ningún método de pago asignado</span>
                        </div>
                        <div class="change">
                            <a href="/update-card">Añadir</a>
                        </div>
                    {/if}
                </div>
            </div>

            <div class="line"></div>

            <div class="summary">
                <h3>Resumen</h3>
                <div class="bill">
                    <div class="bill-line product-price">
                        <h4>{productName}</h4>
                        <span>{price} €</span>
                    </div>
                    <div class="bill-line shipping-price">
                        <h4>Envío</h4>
                        <span>{shippingPrice} €</span>
                    </div>
                </div>
            </div>

            <div class="line"></div>

            <div class="total">
                <h3>Total</h3>
                <h3>{total} €</h3>
            </div>

            <button class="submit" type="submit" disabled={buttonDisabled}>Hacer el pedido</button>

        </div>
    </div>
</div>

<style>
    .container {
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 5rem;
    }

    .purchase-info {
        width: 50rem;
        padding: 2rem;
        background-color: #fff;
        border-radius: 0.5rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    h3 {
        font-size: 1.5rem;
        margin: 0 0 1rem;
    }

    .line {
        border-top: 0.1rem solid rgb(205, 205, 205);
    }

    .product {
        border: 0.1rem solid rgb(205, 205, 205);
        border-radius: 1rem;
        height: 20rem;
        padding: 0.5rem;
        display: grid;
        grid-template-columns: max-content auto;
        grid-template-rows: 1fr 1fr;
    }

    .product h5, .product p {
        margin: 0;
    }

    .product h5 {
        font-size: 2rem;
        margin-bottom: 0.4rem;
    }

    .image {
        grid-row: 1 / -1;
    }

    .image img {
        max-height: 100%;
    }

    .description, .seller {
        padding: 1rem;
    }

    .description p, .seller div {
        font-weight: 500;
    }

    .seller-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .seller-info img {
        width: 2rem;
    }

    .address-description, .payment-description {
        display: grid;
        grid-template-columns: 1fr 7fr 1fr;
    }

    .change {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .address-logo, .card-logo {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .address-logo i, .card-logo i {
        font-size: 3rem;
    }

    .no-address, .no-card {
        display: flex;
        align-items: center;
        gap: 3rem;
    }

    /* .no-address a, .no-card a {
        height: 100%;
        border: 0.1rem solid rgb(205, 205, 205);
        border-radius: 1rem;
        font-size: 1rem;
        padding: 0.5rem;
        cursor: pointer;
        text-decoration: none;
    }

    .no-address a:hover, .no-card a:hover {
        background-color: black;
        color: #fff;
    } */

    .bill {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    h4 {
        margin: 0;
    }

    .bill-line, .total {
        display: flex;
        justify-content: space-between;
    }

    .shipping-price h4 {
        font-weight: 500;
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

    .submit:hover {
        opacity: 0.6;
    }

    .submit:disabled {
        opacity: 0.5;
        cursor: auto;
    }

    .total h3 {
        font-weight: 800;
    }

</style>