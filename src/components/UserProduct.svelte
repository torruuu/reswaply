<script>
    export let post;

    let link = "/posts/" + post.id;
    let img = post.product.img;
    let title = post.product.name;
    let storage = post.product.storage;
    let color = post.product.color;
    let price = post.price;
    let status = post.condition;
</script>

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
            <i class="fa-solid fa-trash"></i>
        </div>
        <div class="edit icon">
            <i class="fa-solid fa-pen"></i>
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
        grid-template-columns: 1fr 10fr 1fr;
        grid-template-rows: repeat(4, 1fr);
        column-gap: 2rem;

        transition: transform 300ms;
    }

    .container:hover {
        transform: translateY(-2%);
    }

    .image {
        grid-row: 1 / -1;
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

    i {
        cursor: pointer;
        font-size: 1.5rem;
    }
</style>