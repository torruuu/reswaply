<script>
	import Map from "./Map.svelte";

</script>

<svelte:head>
    <script async
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB4QMWW0LstYeT_oAvCX0pMc0f69TP7gPI&libraries=places&callback=initMap">
    </script>
</svelte:head>

<Map />