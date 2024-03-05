<script>
	import Overlay from "./Overlay.svelte";

    export let post;

    let postId = post.id;
    let link = "/posts/" + postId;
    let img = post.product.img;
    let title = post.product.name;
    let storage = post.product.storage;
    let color = post.product.color;
    let price = post.price;
    let status = post.condition;

    let showOverlay = false;
</script>

{#if showOverlay}
    <Overlay action={'/profile/products?/delete'} on:close={() => showOverlay = false}>
        <input type="hidden" name="id" value={postId}>
    </Overlay>
{/if}

<div class="container">
    <a href={link} class="image">
        <img src={img} alt={title}>
    </a>
    <div class="title text">
        <span>{title}</span>
    </div>
    <div class="product-data text">
        <span>{storage} GB - {color}</span>
    </div>
    <div class="status text">
        <span>{status}</span>
    </div>
    <div class="price text">
        <span>{price} €</span>
    </div>
    <div class="buttons">
        <div class="trash icon">
            <button on:click={() => showOverlay = true}>
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
        <div class="edit icon">
            <a href={'/update-product/' + postId}>
                <i class="fa-solid fa-pen"></i>
            </a>
        </div>
    </div>  
</div>

<style>
    .container {
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        padding: 0.4rem 1rem;
        height: 10rem;
        width: 100%;
        display: grid;
        grid-template-columns: 3fr 9fr 1fr;
        grid-template-rows: repeat(4, 1fr);
        column-gap: 2rem;

        transition: transform 300ms;
    }

    .container:hover {
        transform: translateY(-2%);
    }

    .image {
        grid-row: 1 / -1;
        border-right: 0.1rem solid rgb(205, 205, 205);
    }

    img {
        height: 100%;
    }

    .text {
        display: flex;
        align-items: center;
    }

    .title span {
        font-weight: bolder;
    }

    .price span {
        font-weight: bold;
    }

    .icon {
        display: flex;
        justify-content: end;
        align-items: center;
    }

    .buttons {
        grid-column: 3 / -1;
        grid-row: 1 / -1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }

    button {
        background: none;
        border: none;
        cursor: pointer;
    }

    i {
        font-size: 1.5rem;
    }
</style>