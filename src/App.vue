<script setup>
    import Navbar from '@/components/Navbar.vue';
    import HomeView from '@/views/HomeView.vue';
</script>

<template>
    <div class="h-screen dark:bg-darkbg flex flex-col-reverse sm:flex-col">
	<Navbar />
	<HomeView />
    </div>
</template>
