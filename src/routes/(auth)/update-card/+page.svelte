<script>
    import { enhance } from '$app/forms';
    import { goto, afterNavigate } from '$app/navigation';
    import { base } from '$app/paths';

    let previousPage = base;
    export let form;

    let cardNumber = '';
    let month = '';
    let year = '';
    let code = '';
    
    let numberError = '';
    let monthError = '';
    let yearError = '';
    let codeError = '';

    function isDateAfterCurrent() {
        const currentYear = new Date().getFullYear() % 100;
        const currentMonth = new Date().getMonth() + 1;
        
        if (+year === currentYear && +month <= currentMonth) {
            yearError = 'La fecha debe ser posterior a la actual';
            return;
        }

        yearError = '';
        return;
    }

    function handleCardNumber(event) {
        let inputVal = event.target.value.replace(/\s/g, ''); // Eliminar espacios en blanco existentes

        if (inputVal === '') {
            numberError = '';
            return;
        }

        let formattedVal = '';

        if (!/^\d+$/.test(inputVal)) {
            numberError = 'Solo se permiten números';
            return;
        }

        for (let i = 0; i < inputVal.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedVal += ' '; // Agregar un espacio cada 4 dígitos
            }
            formattedVal += inputVal[i];
        }

        cardNumber = formattedVal; // Actualizar el valor del campo de entrada con el formato deseado
        numberError = ''; // Limpiar el mensaje de error si no hay errores
    }

    function handleMonth(event) {
        let inputVal = event.target.value.replace(/\s/g, ''); // Eliminar espacios en blanco existentes
        month = inputVal;

        if (inputVal === '') {
            monthError = '';
            return;
        }

        if (!/^\d+$/.test(inputVal)) {
            monthError = 'Solo se permiten números';
            return;
        }

        if (inputVal.length !== 2 || +inputVal < 1 || +inputVal > 12) {
            monthError = 'El mes debe ser un número entre 01 y 12';
            return;
        }

        monthError = '';
        isDateAfterCurrent();
    }

    function handleYear(event) {
        let inputVal = event.target.value.replace(/\s/g, ''); // Eliminar espacios en blanco existentes
        year = inputVal;

        if (inputVal === '') {
            yearError = '';
            return;
        }

        if (!/^\d+$/.test(inputVal)) {
            yearError = 'Solo se permiten números';
            return;
        }

        if (inputVal.length !== 2 || +inputVal < 0 || +inputVal > 99) {
            yearError = 'El año debe ser un número entre 00 y 99';
            return;
        }

        const currentYear = new Date().getFullYear() % 100;

        if (+inputVal === currentYear) {
            isDateAfterCurrent();
            return;
        }
        if (+inputVal < currentYear) {
            yearError = 'La fecha debe ser posterior a la actual';
            return;
        }
        yearError = '';
    }

    function handleCode(event) {
        let inputVal = event.target.value.replace(/\s/g, ''); // Eliminar espacios en blanco existentes
        code = inputVal;

        if (inputVal === '') {
            codeError = '';
            return;
        }

        if (!/^\d+$/.test(inputVal)) {
            codeError = 'Solo se permiten números';
            return;
        }
        codeError = '';
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

<form method="post" use:enhance>
    <label>
        Titular:
        <input type="text" name="cardholder" required><br>
    </label>
    
    <label>
        Número de tarjeta:
        <input type="text" name="number" bind:value={cardNumber} on:input={handleCardNumber} maxlength="19" minlength="19" required><br>
    </label>
    {#if numberError}
        <p style="color: red;">{numberError}</p>
    {/if}

    <label>
        Mes:
        <input type="text" name="month" bind:value={month} on:input={handleMonth} maxlength="2" required><br>
    </label>
    {#if monthError}
        <p style="color: red;">{monthError}</p>
    {/if}

    <label>
        Año:
        <input type="text" name="year" bind:value={year} on:input={handleYear} maxlength="2" required><br>
    </label>
    {#if yearError}
        <p style="color: red;">{yearError}</p>
    {/if}

    <label>
        CVC:
        <input type="text" name="code" bind:value={code} on:input={handleCode} maxlength="3" minlength="3" required><br>
    </label>
    {#if codeError}
        <p style="color: red;">{codeError}</p>
    {/if}
    
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
