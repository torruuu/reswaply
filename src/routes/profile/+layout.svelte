<script>
	import ProfileHeader from "../../components/ProfileHeader.svelte";
    import Overlay from "../../components/Overlay.svelte";
    import { page } from '$app/stores';

    let path = $page.route.id;
    let showOverlay = false;

    $: {
        path = $page.route.id;
    }
</script>

{#if showOverlay}
    <Overlay action={'/profile?/logout'} on:close={() => showOverlay = false} title={'¿Cerrar sesión?'} description={'Estás a punto de abandonar tu perfil'}/>
{/if}

<div class="container">
    {#key path}
        <ProfileHeader path={path} on:logout={() => showOverlay = true}/>
    {/key}

    <slot />
</div>

<style>
    .container {
        margin-bottom: 5rem;
    }
</style>