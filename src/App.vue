<script setup>
    import Navbar from '@/components/Navbar.vue';
    import HomeView from '@/views/HomeView.vue';
    import { RouterView, useRouter } from 'vue-router';
    import axios from 'axios';
    import { onMounted } from 'vue';
    import { store } from '@/shared/store.vue';

    const router = useRouter();

    onMounted(() => {
	axios.get("/authApi/user", {
	    headers: {
		Authorization: `Bearer ${localStorage.token}`
	    }
	}).then((res) => {
	    localStorage.role = res.data.role;
	    store.role = res.data.role;
	    store.authenticated = true;
	    localStorage.authenticated = true;
	}, () => {
	    store.authenticated = false;
	    localStorage.authenticated = false;
	    localStorage.role = "";
	    router.push("/authView");
	})
    });
</script>

<template>
    <div class="h-screen dark:bg-bt-darkbg flex flex-col-reverse sm:flex-col">
	<Navbar v-if="store.authenticated" />
	<RouterView />
    </div>
</template>
