<script>
    export let title = 'Si no lo veo, no lo creo...';
    export let description = '¡Aún no has pillado nada en Reswaply!';
    export let buttonValue = '¡Llévate un reacondicionado!';
    export let redirect = '/';
</script>

<div class="container">
    <div class="icon">
        <i class="fa-solid fa-face-sad-tear"></i>
    </div>
    <div class="title">
        <h3>{title}</h3>
    </div>
    <div class="description">
        <span>{description}</span>
    </div>
    <div class="help-text">
        <span>Con sólo un clic, puedes solucionarlo:</span>
    </div>
    <div class="redirect">
        <a href={redirect}>{buttonValue}</a>
    </div>
</div>

<style>
    .container {
        background-color: #fff;
        border: 0.1rem solid rgb(205, 205, 205);
        width: 60rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem 0;
    }

    .icon i {
        font-size: 4rem;
    }

    h3 {
        text-transform: uppercase;
        margin: 1.5rem 0 0.5rem;
        font-size: 1.7rem;
    }

    .help-text {
        margin: 2rem 0 0.5rem;
    }

    a {
        display: inline-block;
        background-color: #000;
        color: #fff;
        width: 40rem;
        padding: 1.4rem 0;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        border-radius: 0.5rem;
    }

    a:hover {
        opacity: 0.5;
    }
</style>