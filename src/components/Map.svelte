<script>
    import { onMount, createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    let map;
    let marker;
    let autocomplete;
    let zoom = 5.2;
    let center = { lat: 40.463667, lng: -3.74922 };

    let divMap;
    let placeInput;
    let errorMessage;

    const fieldValues = {
        provinceValue: "",
        cityValue: "",
        addressValue: "",
        codeValue: "",
        numberValue: "",
    }

    onMount(() => {
        try {
            initMap();
        } catch (error) {
            console.error('Error loading Google Maps', error);
            errorMessage = "Error al cargar Google Maps";
        }
    });

    function initMap() {
        map = new google.maps.Map(divMap, {
            center,
            zoom,
            gestureHandling: 'none',
            zoomControl: false,
            fullscreenControl: false,
            streetViewControl: false,
            mapTypeControl: false
        });
        marker = new google.maps.Marker({
            center,
            map
        });
        initAutocomplete();
    }

    function initAutocomplete() {
        autocomplete = new google.maps.places.Autocomplete(placeInput, {
            componentRestrictions: { country: ['es'] },
            fields: ['address_components', 'geometry']
        });
        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            console.log(place);

            Object.keys(fieldValues).forEach(key => {
                fieldValues[key] = "";
            });

            for (const component of place.address_components) {
                const componentType = component.types[0];

                switch (componentType) {
                    case 'administrative_area_level_2':
                        fieldValues.provinceValue = component.long_name;
                        break;
                    case 'locality':
                        fieldValues.cityValue = component.long_name;
                        break;
                    case 'route':
                        fieldValues.addressValue = component.long_name;
                        break;
                    case 'postal_code':
                        fieldValues.codeValue = component.long_name;
                        break;
                    case 'street_number':
                        fieldValues.numberValue = component.long_name;
                        break;
                }
            }
            // Mandamos los datos introducidos al padre
            dispatch("change", {
                fieldValues: fieldValues
            });

            // Cambiamos el map a la posición del input
            map.setCenter(place.geometry.location);
            map.setZoom(14);
            // Cambiamos la posición del marker
            marker.setPosition(place.geometry.location);
        });
    }
</script>

<h1>Maps + Svelte</h1>

<input type="text" bind:this={placeInput} class="finder">
<div class="map" bind:this={divMap}>
    {#if errorMessage !== undefined}
        <p>{errorMessage}</p>
    {/if}
</div>

<style>
    .map {
        width: 50vw;
        height: 50vh;
    }
    .finder {
        width: 50%;
    }
</style>