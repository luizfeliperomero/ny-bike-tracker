<script setup>
    defineProps({	
	label: String,
	value: Number,
	labelColor: {
	    type: String,
	    default: "text-black dark:text-white"
	},
	valueColor: {
	    type: String,
	    default: "text-black dark:text-white"
	},
	valueBg: {
	    type: String,
	    default: "bg-transparent"
	}
    });
</script>
<template>
    <div class="cursor-pointer p-1 hover:ring-2 hover:ring-green-500 flex flex-col gap-2 items-center justify-center">
	<h1 :class="['text-md', labelColor]">{{ label }}</h1>
	<div :class="['flex justify-center items-center w-30 h-20 p-3 text-4xl font-bold', valueBg, valueColor]">{{ value }}</div>
    </div>
</template>
