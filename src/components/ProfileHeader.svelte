<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();
  export let path;
  
  const sections = [
    { text: 'Perfil', route: '/profile/info' },
    { text: 'Compras', route: '/profile/shopping' },
    { text: 'Ventas', route: '/profile/sales' },
    { text: 'Productos', route: '/profile/products' },
    { text: 'Favoritos', route: '/profile/favorites' },
    { text: 'Cerrar sesión' },
  ];

  // Define una función para verificar si la ruta actual coincide con una determinada sección
  const isCurrentSection = (section) => new RegExp(`^${section}`).test(path);

  function handleLogout() {
    dispatch('logout');
  }
</script>
  
<nav>
  <div class="container">
    {#each sections as section}
      {#if section.text === 'Cerrar sesión'}
        <div class="logout">
          <button on:click={handleLogout}>{section.text}</button>
        </div>
      {:else}
        <a href={section.route} class:active={isCurrentSection(section.route)}>{section.text}</a>
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

    a, button {
        padding: 0.5rem;
        text-decoration: none;
        border-radius: 20px;
        font-weight: 400;
        font-size: 1.1rem;
        cursor: pointer;
    }

    button {
      background: none;
      border: none;
    }

    .active {
      font-weight: 700;
    }

    .logout {
        flex: 1;
        min-width: max-content;
        display: flex;
        justify-content: flex-end;
    }
</style>