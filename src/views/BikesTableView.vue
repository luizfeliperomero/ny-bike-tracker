<script setup>
    import {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from '@/components/ui/table'
    import { ref, computed, onMounted } from 'vue';
    import axios from 'axios';
    import { Button } from '@/components/ui/button'

    const bikes = ref([])
    const currentPage = ref(1)
    const pageSize = 10

    const totalPages = computed(() => Math.ceil(bikes.value.length / pageSize))

    const paginatedBikes = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return bikes.value.slice(start, start + pageSize)
    })

    function prevPage() {
      if (currentPage.value > 1) currentPage.value--
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    const getData = () => {
	axios.get("/api").then((response) => {
	    bikes.value = response.data.data.bikes;
	});
    }

    onMounted(() => {
	getData();
    });

    const formatBoolean = (value) => {
	return value ? "Yes" : "No";
    }
</script>
<template>
  <div class="flex flex-col p-20 gap-10">
      <Button @click="$router.push('/adminPanel')" class="w-15" variant="secondary">Go Back</Button>
      <Table v-if="bikes.length > 0">
	<TableCaption>A list of Bird's bikes data in New York, USA</TableCaption>
	<TableHeader>
	  <TableRow>
	      <TableHead>ID</TableHead>
	      <TableHead>Lat</TableHead>
	      <TableHead>Lon</TableHead>
	      <TableHead>Is Disabled</TableHead>
	      <TableHead>Is Reserved</TableHead>
	      <TableHead>Vehicle Type ID</TableHead>
	      <TableHead>Last Reported</TableHead>
	      <TableHead>Current Range (m)</TableHead>
	      <TableHead>Current Battery</TableHead>
	  </TableRow>
	</TableHeader>
	<TableBody>
	  <TableRow v-for="bike in paginatedBikes" :key="bike.bike_id">
	      <TableCell>{{ bike.bike_id }}</TableCell>
	      <TableCell>{{ bike.lat }}</TableCell>
	      <TableCell>{{ bike.lon }}</TableCell>
	      <TableCell>{{ formatBoolean(bike.is_disabled) }}</TableCell>
	      <TableCell>{{ formatBoolean(bike.is_reserved) }}</TableCell>
	      <TableCell>{{ bike.vehicle_type_id }}</TableCell>
	      <TableCell>{{ bike.last_reported }}</TableCell>
	      <TableCell>{{ bike.current_range_meters }}</TableCell>
	      <TableCell>{{ (bike.current_fuel_percent * 100).toFixed(1) }}%</TableCell>
	  </TableRow>
	</TableBody>
	<div v-if="bikes.length > pageSize" class="flex justify-center items-center gap-4 mt-4">
	  <Button variant="outline" @click="prevPage" :disabled="currentPage === 1">
	    Previous
	  </button>
	  <span>Page {{ currentPage }} of {{ totalPages }}</span>
	  <Button variant="outline" @click="nextPage" :disabled="currentPage === totalPages">
	    Next
	  </button>
	</div>
      </Table>
  </div>
</template>
