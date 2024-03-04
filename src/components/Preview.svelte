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

<a href={link} class="link">
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
    .link {
        background-color: #fff;
        width: 17rem;
        height: 22rem;
        text-decoration: none;
        padding: 0 1.5rem;
        border-radius: 0.6rem;
        box-shadow: 0 0.2rem 0.2rem 0 rgb(205, 205, 205);

        display: inline-block;
    }

    .link:hover {
        box-shadow: 0 0.4rem 0.2rem 0.1rem rgb(205, 205, 205);
    }

    .content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
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
    
    img {
        height: 12rem;
    }
</style>