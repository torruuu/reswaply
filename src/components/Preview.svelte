<script>
    export let post;

    let link = "/posts/" + post.id;
    let img = post.product.img;
    let title = post.product.name;
    let storage = post.product.storage;
    let color = capitalizeFirstLetter(post.product.color);
    let price = post.price;

    function capitalizeFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.substring(1);
    }
</script>

<a href={link} class="container">
    <div class="content">
        <div class="image">
            <img src={img} alt={title}>
        </div>
        <span class="title">{title}</span>
        <span class="description">{storage} GB - {color}</span>
        <span class="price">{price} €</span>
    </div>
</a>

<style>
    .container {
        background-color: #fff;
        width: 17rem;
        display: inline-block;
        text-decoration: none;
        padding: 1.5rem;
        border-radius: 0.6rem;
        box-shadow: 0 0.2rem 0.2rem 0 rgb(205, 205, 205);
    }

    .container:hover {
        box-shadow: 0 1rem 1rem 0 rgb(205, 205, 205);
    }

    .content {
        display: flex;
        flex-direction: column;
    }

    .image {
        display: flex;
        justify-content: center;
        margin-bottom: 1.5rem;
    }

    .title {
        font-size: 1.5rem;
        font-weight: 600;
    }

    .description {
        font-size: 1.1rem;
        padding: 0.3rem 0 0.8rem;
    }

    .price {
        font-size: 1.4rem;
        font-weight: 600;
    }
    
    .container img {
        height: 12rem;
    }
</style>