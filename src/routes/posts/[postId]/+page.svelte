<script>
	import Detail from "../../../components/Detail.svelte";

    export let data;
    export let form;
    const post = data.post;
    const user = data.userName;
    let liked = data.isLiked;

    $: {
        liked = data.isLiked;
    }
</script>

{#key form}
    <div class="container">
        <Detail post={post} user={user} liked={liked} />
    </div>
{/key}

<style>
    .container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>