<div class="container">
    <div class="success-content">
        <i class="fa-solid fa-circle-check"></i>
        <h3>¡Pedido realizado con éxito!</h3>
        <span>Su pedido se ha realizado con éxito. Consulte su correo electrónico para consultar los detalles del pedido, número de seguimiento, etc.</span>
        <div class="buttons">
            <a href="/">Seguir comprando</a>
            <a href="/profile/shopping">Ver mis compras</a>
        </div>
    </div>
</div>

<style>
    .container{
        width: 100%;
        height: 36em;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .success-content {
        background-color: #fff;
        padding: 2rem;
        width: 60rem;
        height: max-content;
        border-radius: 0.5rem;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }

    .success-content h3 {
        margin: 0;
        font-size: 3rem;
    }

    .success-content span {
        width: 80%;
    }

    .success-content i {
        font-size: 7rem;
        color: #4caf50;
    }

    .buttons {
        display: flex;
        gap: 1rem;
    }

    .buttons a {
        background-color: #000;
        color: #fff;
        text-decoration: none;
        font-size: 1.5rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
    }

    .buttons a:hover {
        opacity: 0.6;
    }
</style>