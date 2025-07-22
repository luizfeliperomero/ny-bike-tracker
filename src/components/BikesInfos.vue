<script setup>
    import BikesInfo from '@/components/BikesInfo.vue';

    defineProps({
	bikes: Array,
	availableBikes: Array,
	reservedBikes: Array,
	disabledBikes: Array,
    });
</script>
<template>
    <div class="flex p-5 justify-center flex-wrap gap-10">
	<div class="flex justify-center gap-10">
	<BikesInfo 
	    label="Total" 
	    :value="bikes.length"
	    valueBg="bg-[#D1E3FB] dark:bg-transparent"
	/>
	<BikesInfo 
	    label="Available" 
	    :value="availableBikes.length"
	    labelColor="dark:text-green-500"
	    valueColor="text-green-700 dark:text-green-500"
	    valueBg="bg-[#DAFDD3] dark:bg-transparent"
	/>
	</div>
	<div class="flex justify-center gap-10">
	<BikesInfo 
	    label="Reserved" 
	    :value="reservedBikes.length"
	    labelColor="dark:text-yellow-400"
	    valueColor="text-yellow-400"
	    valueBg="bg-[#FFFCE0] dark:bg-transparent"
	/>
	<BikesInfo 
	    label="Unavailable" 
	    :value="disabledBikes.length"
	    labelColor="dark:text-gray-400"
	    valueColor="text-gray-400"
	    valueBg="bg-gray-100 dark:bg-transparent"
	/>
	</div>
    </div>
</template>
