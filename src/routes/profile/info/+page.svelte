<script>
    export let data;

    const userName = data.userName;
    const email = data.email;
    const address = data.address;
    const cardNumber = data.cardNumber;
    const cardholder = data.cardholder;
</script>

<h2>Perfil</h2>
<p class="subtitle">Modifica tus datos personales</p>

<div class="container">
    <div class="user-info">
        <div class="text">
            <h4 class="title">Información personal</h4>
            <p>{userName}</p>
            <p>{email}</p>
        </div>
        <div class="button">
            <a href="/profile/info/user-info"><i class="fa-solid fa-pen fa-lg"></i></a>
        </div>
    </div>
    
    <div class="address">
        <div class="text">
            <h4>Dirección de envío</h4>
            {#if address}
                <p>{address?.street + ', ' + address?.number}</p>
                <p>{address?.city + ', ' + address?.province}</p>
            {:else}
                <p>No tiene ninguna dirección asiganada</p>
            {/if}
        </div>
        <div class="button">
            <a href="/update-address"><i class="fa-solid fa-pen fa-lg"></i></a>
        </div>
    </div>
    
    <div class="payments">
        <div class="text">
            <h4>Datos bancarios</h4>
            {#if cardNumber}
                <p>{cardholder}</p>
                <p>{cardNumber}</p>
            {:else}
                <p>No tiene ninguna tarjeta vinculada</p>
            {/if}
        </div>
        <div class="button">
            <a href="/update-card"><i class="fa-solid fa-pen fa-lg"></i></a>
        </div>
    </div>
</div>

<style>
    .container {
        margin: 2rem auto 0;
        display: grid;
        grid-template-columns: repeat(
            auto-fill,
            minmax(30rem, 1fr)
        );
        gap: 2rem;
        max-width: 80rem;
    }

    .user-info, .address, .payments {
        background-color: #fff;
        border: 1px solid #000;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        display: flex;
        padding: 1.5rem;
    }

    .button {
        /* background-color: wheat; */
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;

        flex: 1;
        min-width: max-content;
    }

    h2 {
        text-align: center;
        font-size: 2rem;
        margin: 2rem 0 1rem;
    }

    .subtitle {
        text-align: center;
        font-size: 0.9rem;
    }

    h4 {
        margin: 0 0 1rem 0;
        font-size: 1.4rem;
    }

    p {
        margin: 0;
    }

    p:not(:last-child) {
        margin-bottom: 0.4rem;
    }

    i {
        color: #000;
    }
</style>