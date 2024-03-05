<script>
    export let post;
    export let visualizer;

    let postId = post.id;
    let link = "/posts/" + postId;
    let img = post.product.img;
    let title = post.product.name;
    let price = parseFloat(post.price) + 6.49;
    const seller = post.seller;
    const buyer = post.buyer;
</script>

<a class="container" href={link}>
    <div class="image">
        <img src={img} alt={title}>
    </div>
    <div class="info">
        <h5>{title}</h5>
        {#if seller === visualizer}
            <span>Vendido a {buyer}</span>
        {/if}
        {#if buyer === visualizer}
            <span>Comprado a {seller}</span>
        {/if}
    </div>
    <div class="price">
        <span>{price}€</span>
    </div>
</a>

<style>
    .container {
        text-decoration: none;
        background-color: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        padding: 0.4rem 1rem;
        width: 100%;
        display: grid;
        grid-template-columns: auto 10fr 1fr;
        grid-template-rows: 7rem;

        transition: all 300ms;
    }

    .container:hover {
        transform: translateY(-2%);
    }

    a {
        width: max-content;
    }

    img {
        height: 100%;
    }

    .info {
        margin-left: 4rem;
    }

    h5 {
        margin: 1rem 0;
        font-size: 2rem;
        font-weight: bolder;
    }

    .price {
        margin-top: 1rem;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    .price span {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>