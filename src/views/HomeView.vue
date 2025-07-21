<script setup>
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import BikesInfo from '@/components/BikesInfo.vue';
    
    let bikes = ref([]);
    const api = "https://mds.bird.co/gbfs/v2/public/new-york/free_bike_status.json";
    let availableBikes = ref(0);
    let reservedBikes = ref(0);
    let disabledBikes = ref(0);

    const getData = () => {
	axios.get(api).then((response) => {
	    bikes.value = response.data.data.bikes;
	    availableBikes.value = bikes.value.filter(b => !b.is_disabled && !b.is_reserved && b.current_fuel_percent > 0).length;
	    reservedBikes.value = bikes.value.filter(b => b.is_reserved).length;
	    disabledBikes.value = bikes.value.filter(b => b.is_disabled || b.current_fuel_percent === 0).length;
	})
    }

    onMounted(() => {
	getData();
	setInterval(getData, 30000);
    })
</script>
<template>
    <div class="flex flex-col p-10 justify-center flex-wrap gap-10">
	<div class="flex justify-center items-center gap-10">
    <BikesInfo 
	label="Total" 
	:value="bikes.length"
	valueBg="bg-[#D1E3FB] dark:bg-transparent"
    />
    <BikesInfo 
	label="Available" 
	:value="availableBikes"
	labelColor="dark:text-green-500"
	valueColor="text-green-700 dark:text-green-500"
	valueBg="bg-[#DAFDD3] dark:bg-transparent"
    />
	</div>
	<div class="flex justify-center items-center gap-10">
    <BikesInfo 
	label="Reserved" 
	:value="reservedBikes"
	labelColor="dark:text-yellow-400"
	valueColor="text-yellow-400"
	valueBg="bg-[#FFFCE0] dark:bg-transparent"
    />
    <BikesInfo 
	label="Unavailable" 
	:value="disabledBikes"
	labelColor="dark:text-gray-400"
	valueColor="text-gray-400"
	valueBg="bg-gray-100 dark:bg-transparent"
    />
	</div>
    </div>
</template>
