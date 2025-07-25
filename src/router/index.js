import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AdminPanelView from '@/views/AdminPanelView.vue';
import BikesTableView from '@/views/BikesTableView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
	{
	    path: '/',
	    name: 'home',
	    component: HomeView
	},
	{
	    path: '/adminPanel',
	    name: 'adminPanel',
	    component: AdminPanelView 
	},
	{
	    path: '/bikesTable',
	    name: 'bikesTable',
	    component: BikesTableView 
	}
    ]
});

export default router;
