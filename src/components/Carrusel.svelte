<script>
    const images = [
        '/images/s24.png',
        '/images/iphone15.png',
        '/images/s23.png'
    ]

    let srcShowed = images[1];

    function handleRight() {
        const currentIndex = images.indexOf(srcShowed);
        const nextIndex = (currentIndex + 1) % images.length;
        srcShowed = images[nextIndex];
    }

    function handleLeft() {
        const currentIndex = images.indexOf(srcShowed);
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        srcShowed = images[prevIndex];
    }
</script>

{#key srcShowed}
    <div class="container">
        <div class="image">
            <img src={srcShowed} alt="Carrusel">
        </div>
        <button class="right" on:click={handleRight}>
            <i class="fa-solid fa-chevron-right"></i>
        </button>
        <button class="left" on:click={handleLeft}>
            <i class="fa-solid fa-chevron-left"></i>
        </button>
    </div>   
{/key}

<style>
    .container {
        margin: 0 auto;
        max-width: 1720px;
        height: 25rem;
        position: relative;
        transition: opacity 1s ease;
    }

    .image {
        width: 100%;
        height: 100%;
        overflow: hidden;
        animation: fadeIn 0.4s ease forwards;
    }

    img {
        width: 100%;
    }

    button {
        position: absolute;
        z-index: 1;
        background-color: transparent;
        border: none;
        border-radius: 100%;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        cursor: pointer;

        top: 50%;
        transform: translate(-50%, -50%);
    }

    button:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }

    .left {
        left: 3%;
    }

    .right {
        left: 97%;
    }

    @keyframes fadeIn {
        from {
            opacity: 0; /* La imagen comienza completamente transparente */
        }
        to {
            opacity: 1; /* La imagen termina completamente visible */
        }
    }
</style>