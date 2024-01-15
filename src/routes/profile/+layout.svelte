<script>
	import ProfileHeader from "../../components/ProfileHeader.svelte";
    import { page } from '$app/stores';

    let path = $page.route.id;

    $: {
        path = $page.route.id;
    }
</script>

<div class="background"></div>

{#key path}
    <ProfileHeader path={path}/>
{/key}

<slot />

<style>
    .background {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        background-color: hsla(0, 0%, 7%, .03);
    }
</style>