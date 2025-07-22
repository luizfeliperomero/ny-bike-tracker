<script setup>
    import { GoogleMap, AdvancedMarker, MarkerCluster } from 'vue3-google-map';

    const center = { lat: 40.7128, lng: -74.0060 };
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    defineProps({
	bikes: Array
    });
    const getPinColor = (bike) => {
	return bike.is_disabled || bike.fuel_percent === 0 ? '#E0E0E0' : (bike.is_reserved ? '#FFFFED' : '#90EE90');
    }
</script>
<template>
  <GoogleMap
    :api-key="apiKey"
    mapId="2a57ae30fb443383b374c16e"
    style="width: 100%; height: 100%"
    :center="center"
    :zoom="10"
  >
      <MarkerCluster>
	  <AdvancedMarker
	    v-for="bike in bikes"
	    :key="bike.bike_id"
	    :options="{
	      position: { lat: bike.lat, lng: bike.lon },
	      title: 'bike'
	    }"
	    :pinOptions="{
		background: getPinColor(bike),
		borderColor: getPinColor(bike),
		glyph: '🚲',
	  }"
	  >
	</AdvancedMarker>
      </MarkerCluster>
  </GoogleMap>
</template>
