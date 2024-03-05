<script>
    import Overlay from "./Overlay.svelte";
    import { enhance } from '$app/forms';

    export let post;
    export let user = '';
    export let liked = null;

    const postId = post.id;
    const seller = post.seller;
    const img = post.product.img;
    const title = post.product.name;
    const storage = post.product.storage;
    const price = post.price;
    const color = capitalizeFirstLetter(post.product.color);
    const condition = post.condition;
    const description = post.description;
    const sold = post.sold;

    let showOverlay = false;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
</script>

{#if showOverlay}
    <Overlay action={'/profile/products?/delete'} on:close={() => showOverlay = false}>
        <input type="hidden" name="id" value={postId}>
    </Overlay>
{/if}

<div class="main-container">
    <div class="container">

        <div class="top-info">
            <div class="top-info-description">
                <div class="seller">
                    <img class="user-image" src="/images/user.svg" alt="User">
                    <span>{seller}</span>
                </div>
                {#if (user !== '') && ((user !== seller && !sold) || (sold && liked))}
                    <div class="like-container">
                        <form method="post" use:enhance>
                            <button type="submit" class:button-unliked={!liked} class:button-liked={liked}>
                                <!-- <i class="fa-regular fa-heart"></i> -->
                                <svg class:icon-liked={liked} class:icon-unliked={!liked} xmlns="http://www.w3.org/2000/svg" width="23" height="21" viewBox="0 0 23 21"><path stroke-width="2" d="M14.2032834,0.000936228569 C17.9488199,0.000936228569 20.9944793,3.05761731 20.9999902,6.81784939 C21.007338,12.0880525 16.8916565,15.8767573 11.686665,18.3107131 L11.4809269,18.4053159 C11.1557871,18.543087 10.8618755,18.6055432 10.5183662,18.6055432 C10.2152698,18.6055432 9.91768431,18.5504348 9.58152287,18.4218484 C4.22682013,16.0182023 0.00643263948,12.2230682 3.32229851e-06,6.84632208 C-0.00367057323,3.07966068 3.04015187,0.012876389 6.79303616,0.0101209674 C8.10526384,0.0103698742 9.38897315,0.393056961 10.4871381,1.11137115 C11.5892791,0.383559644 12.8816019,-0.00301899423 14.202365,1.77546866e-05 L14.2032834,0.000936228569 Z" transform="translate(1 1)"></path></svg>
                            </button>
                        </form>
                    </div>
                {/if}
            </div>
        </div>
    
        <div class="post-info">
            <div class="image">
                <img src={img} alt={title} class="product-image">
                {#if sold}
                    <div class="sold">
                        <i class="fa-regular fa-handshake"></i>
                        <span>Vendido</span>
                    </div>
                {/if}
            </div>
        
            <div class="title">
                <h2>{title} - {storage} GB</h2>
            </div>
        
            <div class="price">
                <h3>{price} €</h3>
            </div>
        
            <div class="info">
                <span>{color} - {condition}</span>
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

            {#if !sold && user === seller}
                <div class="buttons">
                    <a href={'/update-product/' + postId} class="edit">
                        Editar producto
                    </a>
                    <button on:click={() => showOverlay = true} class="delete">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            {/if}
        </div>
    
    </div>
    
    {#if !sold && user !== seller}
        <div class="sticky-container">
            <div class="buy">
                <div class="sticky-info">
                    <span class="sticky-title">{title}</span>
                    <span class="sticky-price">{price} €</span>
                </div>
                <a href={'/checkout/' + postId} class="submit">Comprar</a>
            </div>
        </div>
    {/if}
</div>

<style>
    .main-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .container {
        background-color: #fff;
        margin: 5rem 0;
        width: 45rem;
        border-radius: 1rem;
    }

    .post-info {
        padding: 0 2rem;
    }

    .top-info {
        background-color: #fff;
        margin-top: 1rem;
        top: 5rem;
        position: sticky;
        height: 4rem;
        z-index: 1;

        display: flex;
        align-items: center;
    }

    .top-info-description {
        width: 100%;
        padding: 0 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .seller {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .seller span {
        font-weight: 600;
    }

    .user-image {
        width: 2rem;
    }

    .icon-unliked {
        stroke: #fd6c67;
        fill: #fff;
    }

    .icon-liked {
        stroke: #fd6c67;
        fill: #fd6c67;
    }

    .like-container button {
        border: 0.1rem solid rgb(205, 205, 205);
        border-radius: 2rem;
        height: 2.5rem;
        width: 5rem;
        cursor: pointer;
    }

    .button-unliked:hover {
        background-color: #fd6c67;
    }

    .button-liked:hover {
        background-color: rgb(185, 185, 185);
    }

    .image {
        border: 0.1rem solid rgb(205, 205, 205);
        text-align: center;
        height: 35rem;
        border-radius: 1rem;
        position: relative;
    }

    .sold {
        position: absolute;
        top: 5%;
        left: 5%;
        display: flex;
        align-items: center;
        gap: 1rem;
        background-color: rgb(235, 235, 235);
        padding: 0.4rem 0.8rem;
        border-radius: 3rem;
    }

    .sold i, .sold span {
        color: rgb(211, 32, 105);
    }

    .sold span {
        font-weight: 700;
        font-size: 1.5rem;
    }

    .sold i {
        font-size: 2.5rem;
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

    .sticky-container {
        border-top: 0.1rem solid rgb(205, 205, 205);
        background-color: #fff;
        position: sticky;
        bottom: 0;
        align-self: flex-start;
        width: 100%;

        display: flex;
        justify-content: center;
    }

    .buy {
        width: 45rem;
        padding: 0.5rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .sticky-info {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
    }

    .sticky-price {
        font-weight: 600;
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
        width: 8rem;
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
        margin-bottom: 2rem;
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