<script>
    export let post;

    let link = "/posts/" + post.id;
    let img = post.product.img;
    let title = post.product.name;
    let storage = post.product.storage;
    let color = post.product.color;
    let price = post.price;
</script>

<div class="container">
    <img src={img} alt={title}>
    <p>{title}</p>
    <p>{storage} - {color}</p>
    <p>{price}</p>
    <a href={link}>Ver producto</a>
</div>

<style>
    .container {
        background-color: grey;
        width: 10rem;
    }
    
    .container img {
        width: 100%;
    }
</style>