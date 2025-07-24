<script setup>
    import { GoogleMap, AdvancedMarker, MarkerCluster, InfoWindow } from 'vue3-google-map';
    import { Progress } from '@/components/ui/progress';

    const center = { lat: 40.7128, lng: -74.0060 };
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

    defineProps({
	bikes: Array
    });
    const getPinColor = (bike) => {
	return bike.is_disabled || bike.fuel_percent === 0 ? '#E0E0E0' : (bike.is_reserved ? '#FFFFED' : '#90EE90');
    }
    const bikeStatus = (bike) => {
      if (bike.is_disabled || bike.fuel_percent === 0) return 'Unavailable';
      if (bike.is_reserved) return 'Reserved';
      return 'Available';
    } 

    const bikeStatusTextColor = (status) => {
	switch(status) {
	    case "Available":
		return "text-bt-available";
		break;
	    case "Unavailable":
		return "text-bt-unavailable";
		break;
	    case "Reserved":
		return "text-bt-reserved";
		break;
	    default:
		return "text-bt-black";
	}
    }

    const batteryLevelColor = (level) => {
	  level = level * 100;
	  if (level > 79) return "bg-green-500";
	  else if (level > 59) return "bg-green-400";
	  else if (level > 39) return "bg-orange-400";
	  else if (level > 19) return "bg-red-500";
	  else if (level > 0) return "bg-red-700";
	  else return "bg-black";
    }

    const formatRange = (value) => {
      const km = value / 1000;
      const rounded = km.toFixed(1);
      return rounded.endsWith('.0') ? parseInt(rounded) : rounded;
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
	      title: bikeStatus(bike) 
	    }"
	    :pinOptions="{
		background: getPinColor(bike),
		borderColor: getPinColor(bike),
		glyph: '🚲',
	  }"
	  >
	    <InfoWindow>
	      <div class="text-black w-full h-full flex flex-col justify-center items-center gap-3">
		  <span :class="['font-bold', bikeStatusTextColor(bikeStatus(bike))]">{{ bikeStatus(bike) }}</span>
		      <Progress :color="batteryLevelColor(bike.current_fuel_percent)" :model-value="bike.current_fuel_percent * 100" />
			  <p class="font-medium">{{ formatRange(bike.current_range_meters) }} km</p>
	      </div>
	    </InfoWindow>
	</AdvancedMarker>
      </MarkerCluster>
  </GoogleMap>
</template>
