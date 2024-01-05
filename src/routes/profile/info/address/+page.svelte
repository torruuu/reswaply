<script>
	import Map from "../../../../components/Map.svelte";

    let fieldValues;

    function handleChange(e) {
        console.log(e.detail);
        fieldValues = e.detail.fieldValues;
    }
</script>

<Map on:change={handleChange}/>

<form method="post">
    <span>Provincia:</span>
    <input type="text" value={fieldValues?.provinceValue ?? ''}><br>
    <span>Ciudad:</span>
    <input type="text" value={fieldValues?.cityValue ?? ''}><br>
    <span>Direccion:</span>
    <input type="text" value={fieldValues?.addressValue ?? ''}><br>
    <span>Numero:</span>
    <input type="text" value={fieldValues?.numberValue ?? ''}><br>
    <span>CP:</span>
    <input type="text" value={fieldValues?.codeValue ?? ''}><br>
</form>