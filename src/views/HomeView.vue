<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import GoogleMaps from '@/components/GoogleMaps.vue';
    import BikesInfos from '@/components/BikesInfos.vue';
    
    let bikes = ref([]);
    let availableBikes = ref([]);
    let reservedBikes = ref([]);
    let disabledBikes = ref([]);

    const pinOptions = { background: '#FBBC04' }

    const getData = () => {
	axios.get("/api").then((response) => {
	    bikes.value = response.data.data.bikes;
	    for (const bike of bikes.value) {
	      if (!bike.is_disabled && !bike.is_reserved && bike.current_fuel_percent > 0) {
		availableBikes.value.push(bike);
	      }

	      if (bike.is_reserved) {
		reservedBikes.value.push(bike);
	      }

	      if (bike.is_disabled || bike.current_fuel_percent === 0) {
		disabledBikes.value.push(bike);
	      }
	    }
	});
    }

    onMounted(() => {
	getData();
	//setInterval(getData, 30000);
    })
</script>
<template>
    <GoogleMaps :bikes="bikes" />
    <BikesInfos 
	:bikes="bikes" 
	:availableBikes="availableBikes"
	:reservedBikes="reservedBikes"
	:disabledBikes="disabledBikes"
    />
</template>
