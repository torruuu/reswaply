<script>
	import Detail from "../../../components/Detail.svelte";

    export let data;
    const post = data.post;
    const user = data.userName;
    console.log('user:' + user);
</script>

<div class="container">
    <Detail post={post} user={user} />
</div>

<style>
    .container {
        width: 100%;
        display: flex;
        justify-content: center;
    }
</style>