<script setup>
    import logo from '@/assets/img/logo.png';
    import toggleLight from '@/assets/svg/toggle-light.svg';
    import toggleDark from '@/assets/svg/toggle-dark.svg';
    import { ref, computed, onMounted } from 'vue'
    import { RouterLink, useRoute } from 'vue-router';

    const isDark = ref(false);

    onMounted(() => {
	isDark.value = document.body.classList.contains('dark');
    })

    const isActiveLink = (routePath) => {
	const route = useRoute();
	return route.path === routePath;
    }

    const toggleDarkMode = () => {
	document.body.classList.toggle('dark');
	isDark.value = document.body.classList.contains('dark');
    };

    const toggleIcon = computed(() => (isDark.value ? toggleDark : toggleLight))
</script>
<template>
    <nav class="flex p-2 justify-between items-center bg-bt-primary w-full">
	<img class="h-20" :src="logo" alt="Bike Tracker" />
	<div class="flex justify-center items-center gap-10">
	    <RouterLink to="/" :class="['-white font-medium hover:text-bt-secondary', isActiveLink('/') ? 'text-bt-secondary': 'text-white']">Home</RouterLink>
	    <RouterLink to="/adminPanel" :class="['font-medium hover:text-bt-secondary', isActiveLink('/adminPanel') ? 'text-bt-secondary': 'text-white']">Admin Panel</RouterLink>
	</div>
	<img class="h-6 cursor-pointer" :src="toggleIcon" alt="Bike Tracker" @click="toggleDarkMode"/>
    </nav>
</template>
