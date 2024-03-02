<script>
    import Overlay from "./Overlay.svelte";

    export let post;
    export let user;

    const postId = post.id;
    const seller = post.seller;
    const img = post.product.img;
    const title = post.product.name;
    const storage = post.product.storage;
    const price = post.price;
    const brand = post.product.brand;
    const condition = post.condition;
    const description = post.description;
    const sold = post.sold;

    let showOverlay = false;
    console.log(postId + '>>' + user + '>>' + seller);
</script>

{#if showOverlay}
    <Overlay action={'/profile/products?/delete'} on:close={() => showOverlay = false}>
        <input type="hidden" name="id" value={postId}>
    </Overlay>
{/if}

<div class="container">

    <div class="seller">
        <img class="user-image" src="/images/user.svg" alt="User">
        <span>{seller}</span>
    </div>

    <div class="image">
        <img src={img} alt={title} class="product-image">
    </div>

    <div class="title">
        <h2>{title} - {storage} GB</h2>
    </div>

    <div class="price">
        <h3>{price} €</h3>
    </div>

    <div class="info">
        <span>{brand} - {condition}</span>
    </div>

    <div class="description">
        <span>{description}</span>
    </div>

    <div class="shipment">
        <h4>Entrega en 3 - 7 días</h4>
        <div class="shipment-info">
            <i class="fa-solid fa-house"></i>
            <span>Entrega en tu dirección por <span class="bold">6,49 €</span></span>
        </div>
    </div>

    <div class="protection">
        <div class="title">
            <i class="fa-solid fa-shield-halved"></i>
            <h4>Protección ReSwaply</h4>
        </div>
        <div class="protection-info">
            <span>Compra sin preocupaciones mediante nuestro servicio de envíos. Transacción protegida con reembolso, pagos seguros y ayuda siempre que la necesites.</span>
        </div>
    </div>

    {#if !sold}
        {#if user === seller}
            <div class="buttons">
                <a href={'/update-product/' + postId} class="edit">
                    Editar producto
                </a>
                <button on:click={() => showOverlay = true} class="delete">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        {:else}
            <div class="buy">
                <a href={'/checkout/' + postId} class="submit">Comprar</a>
            </div>
        {/if}
    {/if}

</div>

<style>
    .container {
        padding: 2rem;
        background-color: #fff;
        margin: 5rem 0;
        width: 45rem;
        border-radius: 1rem;
    }

    .seller {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.8rem;
    }

    .seller span {
        font-weight: 600;
    }

    .user-image {
        width: 2rem;
    }

    .image {
        border: 0.1rem solid rgb(205, 205, 205);
        text-align: center;
        height: 35rem;
        border-radius: 1rem;
    }

    .product-image {
        height: 100%;
    }

    h2 {
        font-size: 2.5rem;
        margin: 1rem 0 0;
        font-weight: 700;
    }

    h3 {
        margin: 1rem 0 1rem;
        font-size: 2rem;
        font-weight: 600;
    }

    h4 {
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .info {
        border-bottom: 0.1rem solid rgb(205, 205, 205);
        padding-bottom: 1rem;
    }

    .info span {
        color: rgb(110, 110, 110);
    }

    .description {
        border-bottom: 0.1rem solid rgb(205, 205, 205);
        padding: 2rem 0;
        font-weight: 500;
    }

    .shipment {
        border-bottom: 0.1rem solid rgb(205, 205, 205);
        padding: 2rem 0;
    }

    .shipment-info {
        margin-top: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .shipment-info i, .protection i {
        font-size: 2rem;
    }

    .shipment-info > span {
        font-weight: 500;
    }

    .bold {
        font-weight: 700;
    }

    .protection {
        padding: 2rem 0;
    }

    .protection .title {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .protection-info {
        margin-top: 1.5rem;
        font-weight: 500;
    }

    .buy {
        position: sticky;
        bottom: 0;
    }

    .submit, .edit, .delete {
        height: 50px;
        border-radius: 2rem;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
    }

    .submit, .edit {
        background-color: #000;
        color: #fff;
        font-weight: 600;
        text-decoration: none;
    }

    .submit {
        display: inline-block;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .edit {
        width: 85%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .delete {
        width: 10%;
        margin: 0;
        padding: 0;
    }

    .buttons {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .delete:hover {
        background-color: red;
    }

    .delete:hover i {
        color: white;
    }

    .edit:hover, .submit:hover {
        opacity: 0.7;
    }
</style>