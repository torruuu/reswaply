<script>
	import { onMount } from "svelte";
	import Alert from "../../../components/Alert.svelte";
  import ProductForm from "../../../components/ProductForm.svelte";
  export let data;
  export let form;
  let showAlert = false;

  onMount(() => {
    if (form?.error) {
      showAlert = true
    }
  })
</script>

{#if showAlert}
  <Alert type={'error'} title={form.title} description={form.message} on:close={() => showAlert = false}/>
{/if}

<ProductForm data={data} />