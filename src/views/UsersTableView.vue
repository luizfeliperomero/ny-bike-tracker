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

    const users = ref([])
    const currentPage = ref(1)
    const pageSize = 10

    const totalPages = computed(() => Math.ceil(users.value.length / pageSize))

    const paginatedUsers = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return users.value.slice(start, start + pageSize)
    })

    function prevPage() {
      if (currentPage.value > 1) currentPage.value--
    }

    function nextPage() {
      if (currentPage.value < totalPages.value) currentPage.value++
    }

    const getData = () => {
	axios.get("http://192.168.1.112:8083/api/user/all", {
	    headers: {
		Authorization: `Bearer ${localStorage.token}`
	    }
	}).then((response) => {
	    users.value = response.data;
	});
    }

    onMounted(() => {
	getData();
    });
</script>
<template>
  <div class="flex flex-col p-5 gap-10">
      <Button @click="$router.push('/adminPanel')" class="w-15" variant="secondary">Go Back</Button>
      <Table v-if="users.length > 0">
	<TableCaption class="p-5">List of Bike Tracker users</TableCaption>
	<TableHeader>
	  <TableRow>
	      <TableHead class="text-center">Name</TableHead>
	      <TableHead class="text-center">Email</TableHead>
	      <TableHead class="text-center">Role</TableHead>
	      <TableHead class="text-center">ID</TableHead>
	  </TableRow>
	</TableHeader>
	<TableBody>
	  <TableRow v-for="user in paginatedUsers" :key="user._id">
	      <TableCell class="text-center">{{ user.name }}</TableCell>
	      <TableCell class="text-center">{{ user.email }}</TableCell>
	      <TableCell class="text-center">{{ user.role }}</TableCell>
	      <TableCell class="text-center">{{ user._id }}</TableCell>
	  </TableRow>
	</TableBody>
	<div v-if="users.length > pageSize" class="flex justify-center items-center gap-4 mt-4">
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
