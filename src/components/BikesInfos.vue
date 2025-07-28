<script setup>
    import BikesInfo from '@/components/BikesInfo.vue';
    import { ref } from 'vue';

    const emit = defineEmits(['updateMaps']);
    const selectedLabel = ref(null)

    const updateMaps = (arr) => {
	emit('updateMaps', arr);
    };

    defineProps({
	bikes: Array,
	availableBikes: Array,
	reservedBikes: Array,
	disabledBikes: Array,
    });
</script>
<template>
    <div class="flex p-5 justify-center flex-wrap gap-10 dark:bg-bt-primary">
	<div class="flex justify-center gap-10">
	<BikesInfo 
	    :class="selectedLabel === 'Total' ? 'border-2 border-green-500' : ''"
	     @click="() => { selectedLabel = 'Total'; updateMaps(bikes); }"
	    label="Total" 
	    :value="bikes.length"
	    valueBg="bg-[#D1E3FB] dark:bg-transparent"
	/>
	<BikesInfo 
	    :class="selectedLabel === 'Available' ? 'border-2 border-green-500' : ''"
	     @click="() => { selectedLabel = 'Available'; updateMaps(availableBikes); }"
	    label="Available" 
	    :value="availableBikes.length"
	    labelColor="dark:text-green-500"
	    valueColor="text-green-700 dark:text-green-500"
	    valueBg="bg-[#DAFDD3] dark:bg-transparent"
	/>
	</div>
	<div class="flex justify-center gap-10">
	<BikesInfo 
	    :class="selectedLabel === 'Reserved' ? 'border-2 border-green-500' : ''"
	     @click="() => { selectedLabel = 'Reserved'; updateMaps(reservedBikes); }"
	    label="Reserved" 
	    :value="reservedBikes.length"
	    labelColor="dark:text-yellow-400"
	    valueColor="text-yellow-400"
	    valueBg="bg-[#FFFCE0] dark:bg-transparent"
	/>
	<BikesInfo 
	    :class="selectedLabel === 'Unavailable' ? 'border-2 border-green-500' : ''"
	     @click="() => { selectedLabel = 'Disabled'; updateMaps(disabledBikes); }"
	    label="Unavailable" 
	    :value="disabledBikes.length"
	    labelColor="dark:text-gray-400"
	    valueColor="text-gray-400"
	    valueBg="bg-gray-100 dark:bg-transparent"
	/>
	</div>
    </div>
</template>
