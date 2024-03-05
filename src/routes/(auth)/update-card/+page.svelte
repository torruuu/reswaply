<script>
    import Alert from '../../../components/Alert.svelte';
    import { enhance } from '$app/forms';
    import { afterNavigate } from '$app/navigation';
    import { base } from '$app/paths';

    export let form;
    let previousPage = base;
    let showErrorForm = form?.error;

    let cardholder = '';
    let cardNumber = '';
    let month = '';
    let year = '';
    let code = '';
    
    let cardholderError = '';
    let numberError = '';
    let monthError = '';
    let yearError = '';
    let codeError = '';

    let buttonDisabled = true;

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
            monthError = 'Valor entre 01 y 12';
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
            yearError = 'Valor entre 00 y 99';
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

    function handleCardholder(event) {
        let inputVal = event.target.value.trim(); // Eliminar espacios en blanco al principio y al final
        cardholder = inputVal; // Asignar el valor del input a la variable 'text'

        // Verificar si el campo está vacío
        if (inputVal === '') {
            cardholderError = '';
            return;
        }

        // Verificar si el texto contiene solo letras y espacios en blanco
        if (!/^[a-zA-Z\s]+$/.test(inputVal)) {
            cardholderError = 'Solo se permiten caracteres';
            return;
        }

        cardholderError = ''; // Si se superan todas las validaciones, limpiar el error
    }

    // Navegamos a la url anterior cuando success sea true
    afterNavigate(({from}) => {
        previousPage = from?.url.pathname || previousPage;
    })

    $: {
        showErrorForm = form?.error;

        if (cardholderError === '' && numberError === '' && monthError === '' && yearError === '' && codeError === '') {
            buttonDisabled = false;
        } else {
            buttonDisabled = true;
        }
    }
</script>

{#if showErrorForm}
    <Alert type={'error'} title={'Error'} description={form.message} on:close={() => showErrorForm = false}/>
{/if}

<div class="container">
    <form method="post" use:enhance>
        <h1>Actualizar tarjeta</h1>
        <div class="form-content">
            <label>
                Titular:
                <br>
                <input class="field" type="text" name="cardholder" bind:value={cardholder} on:input={handleCardholder} placeholder="Ej: Pepe" required><br>
            </label>
            <div class="error">
                {#if cardholderError}
                    <span style="color: red;">{cardholderError}</span>
                {/if}
            </div>
            
            <label>
                Número de tarjeta:
                <br>
                <input class="field" type="text" name="number" bind:value={cardNumber} on:input={handleCardNumber} maxlength="19" minlength="19" placeholder="Ej: 1111 2222 3333 4444" required><br>
            </label>
            <div class="error">
                {#if numberError}
                    <span style="color: red;">{numberError}</span>
                {/if}
            </div>
        
            <div class="date">
                <label>
                    Mes:
                    <br>
                    <input class="field" type="text" name="month" bind:value={month} on:input={handleMonth} maxlength="2" placeholder="Ej: 08" required><br>
                </label>
            
                <label>
                    Año:
                    <br>
                    <input class="field year" type="text" name="year" bind:value={year} on:input={handleYear} maxlength="2" placeholder="Ej: 25" required><br>
                </label>
                <div class="error">
                    {#if monthError}
                        <span style="color: red;">{monthError}</span>
                    {/if}
                </div>
                <div class="error">
                    {#if yearError}
                        <span style="color: red;">{yearError}</span>
                    {/if}
                </div>
            </div>
        
            <label>
                CVC:
                <br>    
                <input class="field cvc" type="text" name="code" bind:value={code} on:input={handleCode} maxlength="3" minlength="3" placeholder="Ej: 123" required><br>
            </label>
            <div class="error">
                {#if codeError}
                    <span style="color: red;">{codeError}</span>
                {/if}
            </div>
            
            <input type="hidden" name="previous" value={previousPage}>
            <input type="submit" value="Actualizar" name="update" disabled={buttonDisabled}>
        </div>
    </form>
</div>

<style>
    .container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-bottom: 5rem;
    }

    form {
        width: 40%;
    }

    .form-content {
        padding: 2rem;
        border-radius: 1rem;
        background-color: #fff;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    label {
        font-size: 1.3rem;
        font-weight: 600;
    }

    .date {
        /* background-color: aquamarine; */
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: max-content max-content;
        column-gap: 2rem;
    }

    .field {
        margin-top: 0.5rem;
        width: 100%;
        border: none;
        border-bottom: 0.1rem solid rgb(205,205,205);
        font-size: 1.3rem;
    }

    .cvc {
        width: calc(50% - 1rem);
    }

    .field:focus {
        outline: none;
        border-bottom: 0.1rem solid #000;
    }

    .field::placeholder {
        font-size: 1rem;
    }

    .error {
        height: 2rem;
    }

    input[type="submit"] {
        border: none;
        margin: 0.5rem 0;
        font-size: 1.3rem;
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

    input[type="submit"]:hover {
        opacity: 0.6;
    }

    input[type="submit"]:disabled {
        opacity: 0.5;
        cursor: auto;
    }
</style>
