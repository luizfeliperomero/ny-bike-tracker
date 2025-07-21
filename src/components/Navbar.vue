<script setup>
    import logo from '@/assets/img/logo.png';
    import toggleLight from '@/assets/svg/toggle-light.svg';
    import toggleDark from '@/assets/svg/toggle-dark.svg';
    import { ref, computed, onMounted } from 'vue'

    const isDark = ref(false);

    onMounted(() => {
	isDark.value = document.body.classList.contains('dark');
    })
    const toggleDarkMode = () => {
	document.body.classList.toggle('dark');
	isDark.value = document.body.classList.contains('dark');
    };

    const toggleIcon = computed(() => (isDark.value ? toggleDark : toggleLight))
</script>
<template>
    <nav class="flex p-2 justify-between items-center bg-primary w-full">
	<img class="h-20" :src="logo" alt="Bike Tracker" />
	<img class="h-6 cursor-pointer" :src="toggleIcon" alt="Bike Tracker" @click="toggleDarkMode"/>
    </nav>
</template>
