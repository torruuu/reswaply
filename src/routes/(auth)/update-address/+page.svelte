<script>
	import Map from '../../../components/Map.svelte';
    import { enhance } from '$app/forms';
    import { afterNavigate } from '$app/navigation';
    import { base } from '$app/paths';
	import Alert from '../../../components/Alert.svelte';

    let previousPage = base;
    export let form;

    let fieldValues;
    let showErrorForm = form?.error;

    function handleChange(e) {
        fieldValues = e.detail.fieldValues;
    }

    // Navegamos a la url anterior cuando success sea true
    afterNavigate(({from}) => {
        previousPage = from?.url.pathname || previousPage;
    })

    $: {
        showErrorForm = form?.error;
    }
</script>

{#if showErrorForm}
    <Alert type={'error'} title={'Error'} description={form.message} on:close={() => showErrorForm = false}/>
{/if}

<div class="container">
    <h1>Actualizar dirección</h1>

    <div class="content">
        <div class="map">
            <Map on:change={handleChange}/>
        </div>
    
        <div class="fields">
            <form method="post" use:enhance>
                <label>
                    Provincia:
                    <br>
                    <input class="field" type="text" name="province" value={fieldValues?.provinceValue ?? ''} required><br>
                </label>
                <label>
                    Ciudad:
                    <br>
                    <input class="field" type="text" name="city" value={fieldValues?.cityValue ?? ''} required><br>
                </label>
                <label>
                    CP:
                    <br>
                    <input class="field" type="text" name="cp" value={fieldValues?.codeValue ?? ''} required><br>
                </label>
                <label>
                    Dirección:
                    <br>
                    <input class="field" type="text" name="address" value={fieldValues?.addressValue ?? ''} required><br>
                </label>
                <label>
                    Numero:
                    <br>
                    <input class="field" type="text" name="number" value={fieldValues?.numberValue ?? ''} required><br>
                </label>
                <label>
                    Puerta:
                    <br>
                    <input class="field" type="text" name="door" required><br>
                </label>
                <input type="hidden" name="previous" value={previousPage}>
                <input type="submit" value="Actualizar" name="update" class="submit">
            </form>
        </div>
    </div>
</div>

<style>
    .container {
        margin: 0 auto 5rem;
        width: 50%;
        display: flex;
        flex-direction: column;
    }

    .content {
        background-color: #fff;
        display: flex;
        gap: 2rem;
        padding: 1rem 2rem 2rem;
        border-radius: 1rem;
    }

    .fields {
        width: 100%;
        align-self: flex-end;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .field {
        width: 100%;
    }

    .submit {
        margin-top: 0.4rem;
        border: none;
        font-size: 0.8rem;
        background-color: #000;
        color: #fff;
        width: 100%;
        padding: 0.5rem 0;
        text-align: center;
        text-decoration: none;
        font-weight: bold;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .error {
        color: red;
    }
</style>