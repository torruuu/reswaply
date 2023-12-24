<script>
    export let data;
</script>

{#if data.registrado}
    <h1>Bienvenido {data.userName}</h1>
{/if}

{#each data.exercises as exercise}
    <p>{exercise.description}</p>
{/each}