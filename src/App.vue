<script setup>
    import Navbar from '@/components/Navbar.vue';
    import HomeView from '@/views/HomeView.vue';
    import { RouterView } from 'vue-router';
</script>

<template>
    <div class="h-screen dark:bg-bt-darkbg flex flex-col-reverse sm:flex-col">
	<Navbar />
	<RouterView />
    </div>
</template>
