<script>
	import Map from '../../../components/Map.svelte';
    import { enhance } from '$app/forms';
    import { goto, afterNavigate } from '$app/navigation';
    import { base } from '$app/paths';

    let previousPage = base;
    export let form;

    let fieldValues;

    function handleChange(e) {
        fieldValues = e.detail.fieldValues;
    }

    // Navegamos a la url anterior cuando success sea true
    afterNavigate(({from}) => {
        previousPage = from?.url.pathname || previousPage;
    })

    $: {
        if (form?.success) {
            goto(previousPage);
        }
    }
</script>

<Map on:change={handleChange}/>

<form method="post" use:enhance>
    <label>
        Provincia:
        <input type="text" name="province" value={fieldValues?.provinceValue ?? ''} required><br>
    </label>
    <label>
        Ciudad:
        <input type="text" name="city" value={fieldValues?.cityValue ?? ''} required><br>
    </label>
    <label>
        CP:
        <input type="text" name="cp" value={fieldValues?.codeValue ?? ''} required><br>
    </label>
    <label>
        Dirección:
        <input type="text" name="address" value={fieldValues?.addressValue ?? ''} required><br>
    </label>
    <label>
        Numero:
        <input type="text" name="number" value={fieldValues?.numberValue ?? ''} required><br>
    </label>
    <label>
        Puerta:
        <input type="text" name="door" required><br>
    </label>
    <input type="submit" value="Actualizar" name="update">
</form>

{#if form?.error}
    <p class="error">{form.message}</p>
{/if}

{#if form?.success}
    <p>Datos actualizados correctamente</p>
{/if}

<style>
    .error {
        color: red;
    }
</style>