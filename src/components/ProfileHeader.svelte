<script>
    export let path;
  
    const sections = [
      { text: 'Perfil', route: '/profile/info' },
      { text: 'Compras', route: '/profile/shopping' },
      { text: 'Ventas', route: '/profile/sales' },
      { text: 'Productos', route: '/profile/products' },
      { text: 'Cartera', route: '/profile/wallet' },
      { text: 'Log out', route: '/profile/logout' },
    ];
  
    // Define una función para verificar si la ruta actual coincide con una determinada sección
    const isCurrentSection = (section) => new RegExp(`^${section}`).test(path);
  </script>
  
  <nav>
    <div class="container">
      {#each sections as { text, route }}
        {#if route === '/profile/logout'}
          <div class="logout">
            <a href={route} class:active={isCurrentSection(route)}>{text}</a>
          </div>
        {:else}
          <a href={route} class:active={isCurrentSection(route)}>{text}</a>
        {/if}
      {/each}
    </div>
  </nav>

<style>
    nav {
        margin-top: 2rem;
        width: 100vw;
        display: flex;
        justify-content: center;
    }

    .container {
        background-color: #fff;
        width: 60rem;
        display: flex;
        gap: 2rem;
        overflow: auto;
        padding: 0.7rem 0.7rem;
        border: 1px solid #000;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }

    .container::-webkit-scrollbar {
        height: 0.5rem; /* width of the entire scrollbar */
    }

    .container::-webkit-scrollbar-track {
        background: none; /* color of the tracking area */
    }

    .container::-webkit-scrollbar-thumb {
        background-color: #000; /* color of the scroll thumb */
        border-radius: 20px; /* roundness of the scroll thumb */
    }

    a {
        padding: 0.5rem;
        text-decoration: none;
        border-radius: 20px;
    }

    a:hover,
    .active {
        background-color: #c7c7c7;
    }

    .logout {
        flex: 1;
        min-width: max-content;
        display: flex;
        justify-content: flex-end;
    }
</style>