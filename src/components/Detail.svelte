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
        <h3>{title} - {storage} GB</h3>
    </div>

    <div class="price">
        <h2>{price} €</h2>
    </div>

    <div class="info">
        <span>{brand} - {condition}</span>
    </div>

    <div class="description">
        <span>{description}</span>
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
            <div>
                <button class="submit">Comprar</button>
            </div>
        {/if}
    {/if}

</div>

<style>
    .container {
        padding: 2rem;
        background-color: #fff;
        margin-top: 5rem;
        width: 45rem;
        border-radius: 1rem;
    }

    .seller {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
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

    h3 {
        font-size: 2.5rem;
        margin: 1rem 0 0;
    }

    h2 {
        margin: 1rem 0 1rem;
    }

    .info {
        border-bottom: 0.1rem solid rgb(205, 205, 205);
        padding-bottom: 1rem;
    }

    .info span {
        color: rgb(110, 110, 110);
    }

    .description {
        padding: 1rem 0;
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
    }

    .submit {
        width: 100%;
    }

    .edit {
        width: 85%;
        text-decoration: none;
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