<script>
    export let title;
    export let description;
</script>

<h2>{title}</h2>
<p class="subtitle">{description}</p>

<style>
    h2 {
        text-align: center;
        font-size: 2rem;
        margin: 2rem 0 1rem;
    }

    .subtitle {
        text-align: center;
        font-size: 0.9rem;
    }
</style>