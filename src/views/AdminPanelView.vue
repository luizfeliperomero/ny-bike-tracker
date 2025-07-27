<script setup>
    import { Button } from '@/components/ui/button'
</script>
<template>
    <div class="flex flex-wrap h-full justify-center p-5 items-center gap-10">
	<div class="border-2 rounded-xl border-gray-300 w-lg p-5 shadow-lg bg-gray-100 dark:bg-bt-primary dark:border-0">
	    <div class="flex justify-around items-center">
		<div class="flex flex-col items-center gap-10">
		    <i class="pi pi-users text-8xl"></i>
		</div>
		<div class="border-l-gray-300 dark:border-l-gray-600 border-l-2 h-40"></div>
		<div class="flex flex-col items-center gap-2">
		    <Button @click="$router.push('/usersTable')" class="self-center dark:bg-green-400 cursor-pointer">See Users Data</Button>
		</div>
	    </div>
	</div>
	<div class="border-2 rounded-xl border-gray-300 w-lg p-5 shadow-lg bg-gray-100 dark:bg-bt-primary dark:border-0">
	    <div class="flex justify-around items-center">
		<div class="flex flex-col items-center gap-10">
		    <font-awesome-icon icon="fa-solid fa-bicycle" class="text-7xl"/>
		</div>
		<div class="border-l-gray-300 dark:border-l-gray-600 border-l-2 h-40"></div>
		<div class="flex flex-col items-center gap-2">
		    <Button @click="$router.push('/bikesTable')" class="self-center dark:bg-green-400 cursor-pointer">See Bikes Data</Button>
		</div>
	    </div>
	</div>
    </div>
</template>
