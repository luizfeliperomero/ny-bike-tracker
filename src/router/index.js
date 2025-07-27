import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AdminPanelView from '@/views/AdminPanelView.vue';
import BikesTableView from '@/views/BikesTableView.vue';
import AuthView from '@/views/AuthView.vue';
import UsersTableView from '@/views/UsersTableView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
	{
	    path: '/authView',
	    name: 'authView',
	    component: AuthView 
	},
	{
	    path: '/',
	    name: 'home',
	    component: HomeView,
	    meta: { requiresAuth: true, roles: ['user', 'admin'] }
	},
	{
	    path: '/adminPanel',
	    name: 'adminPanel',
	    component: AdminPanelView,
	    meta: { requiresAuth: true, roles: ['admin'] }
	},
	{
	    path: '/bikesTable',
	    name: 'bikesTable',
	    component: BikesTableView,
	    meta: { requiresAuth: true, roles: ['admin'] }
	},
	{
	    path: '/usersTable',
	    name: 'usersTable',
	    component: UsersTableView,
	    meta: { requiresAuth: true, roles: ['admin'] }
	}
    ]
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth) {
	if(!localStorage.authenticated) {
	    return next("/authView");
	}
	if(!to.meta.roles.includes(localStorage.role)) {
	    if(from.path !== to.path) {
		return next(from.path);
	    } 
	}
    } 

    next();
});

export default router;
