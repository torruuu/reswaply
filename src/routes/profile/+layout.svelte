<script>
	import ProfileHeader from "../../components/ProfileHeader.svelte";
    import { page } from '$app/stores';

    let path = $page.route.id;

    $: {
        path = $page.route.id;
    }
</script>

<div class="container">
    {#key path}
        <ProfileHeader path={path}/>
    {/key}

    <slot />
</div>

<style>
    .container {
        margin-bottom: 5rem;
    }
</style>