<script>
    import ProductForm from "../../../../components/ProductForm.svelte";
    export let data;

    const post = data.post;
</script>

<ProductForm action={'/profile/products?/edit'} data={data} post={post} editable={false} buttonValue={'Actualizar'}/>