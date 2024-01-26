<script>
	import ProfileHeader from "../../components/ProfileHeader.svelte";
    import { page } from '$app/stores';

    let path = $page.route.id;

    $: {
        path = $page.route.id;
    }
</script>

{#key path}
    <ProfileHeader path={path}/>
{/key}

<slot />