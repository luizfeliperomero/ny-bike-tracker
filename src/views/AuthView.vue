<script setup>
    import logo from '@/assets/img/logo.png';
    import { Button } from '@/components/ui/button'
    import { ref, computed } from 'vue';
    import { Form, Field, ErrorMessage, configure, defineRule } from 'vee-validate';
    import { required, email as emailValidation } from '@vee-validate/rules';
    import { localize } from '@vee-validate/i18n';
    import axios from 'axios';
    import { useRouter } from 'vue-router';
    import { store } from '@/shared/store.vue'

    defineRule('required', required)
    defineRule('email', emailValidation)

    configure({
	validateOnInput: true,
	generateMessage: localize('en', {
	    messages: {
		required: "Email is required",
		email: "Please enter a valid email address"
	    }
	})
    })

    const isLogin = ref(false);
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const emailRules = "required|email"
    const role = ref([]);
    const authError = ref(false);
    const emailNotUnique = ref(false);
    const router = useRouter(); 

    const passwordsMatch = computed(() => {
	return password.value && confirmPassword.value && password.value === confirmPassword.value;
    });
    const onSubmit = (value) => {
	if(isLogin.value) {
	   axios.post("http://192.168.1.112:8083/api/auth", value).then((res) => {
	      localStorage.token = res.data.token;
	      localStorage.authenticated = true;
	      store.authenticated = true;
	      store.role = res.data.role;
	      localStorage.role = res.data.role;
	      router.push("/");
	   }, (err) => {
	      localStorage.authenticated = false;
	      store.authenticated = false;
	      authError.value = true; 
	   });
	} else {
	   axios.post("http://192.168.1.112:8083/api/auth/register", value).then((res) => {
	      password.value = "";
	      email.value = "";
	      isLogin.value = true;
	   }, (err) => {
	      if(err.status === 409) {
		emailNotUnique.value = true;	
	      }
	   });
	}
    }
</script>
<template>
    <div class="h-full w-full md:px-20 md:py-5">
	<div class="flex flex-col w-full h-full ring-2 ring-gray-200 rounded-md md:flex-row ">
	    <div class="flex flex-col justify-between px-5 py-2 w-full rounded-md h-full bg-bt-primary">
		<img class="h-20 w-20 md:h-30 md:w-30" :src="logo" alt="Bike Tracker" />
		<h1 class="text-white font-medium text-2xl md:text-4xl lg:text-5xl">Discover New York’s Electric Ride: Explore E-Bike Data!</h1>
		<p class="text-white">Data is provided by Bird's system</p>
	    </div>
	    <div class="flex flex-col w-full h-full p-5">
		<div class="flex justify-end w-full">
		    <Button v-if="!isLogin" @click="isLogin = true" variant="outline">Login</Button>
		    <Button v-else @click="isLogin = false" variant="outline">Register</Button>
		</div>
		<div class="flex flex-col gap-10 justify-center items-center self-center h-150">
		    <Form @submit="onSubmit" :validationSchema="registerSchema" v-if="!isLogin" class="flex flex-col gap-8">
			<h1 class="text-3xl text-center font-medium">Create an account</h1>
			<div class="flex flex-col gap-1">
			    <label class="text-gray-600" for="email">Email</label>
			    <Field
				class="ring-1 ring-gray-400 w-xs rounded-sm p-1"
				name="email"
				type="email"
				:rules="emailRules"
				v-model="email"
				placeholder="youremail@domain.com"
			    />
			    <span v-if="emailNotUnique" class="text-red-400">Email already linked to an existing account</span>
			    <ErrorMessage class="text-red-400" as="small" name="email" />
			</div>
			<div class="flex flex-col gap-1">
			    <label class="text-gray-600" for="name">Name</label>
			    <Field
				class="ring-1 ring-gray-400 w-xs rounded-sm p-1"
				name="name"
				type="text"
				:rules="required"
				v-model="name"
			    />
			    <ErrorMessage class="text-red-400" as="small" name="name" />
			</div>
			<div class="flex flex-col gap-1">
			    <label class="text-gray-600" for="role">Role</label>
			    <Field
				as="select"
				class="ring-1 ring-gray-400 w-xs rounded-sm p-1"
				name="role"
				:rules="required"
				v-model="role"
			      >
				<option disabled value="">Select a Role</option>
				<option value="user">User</option>
				<option value="admin">Admin</option>
			    </Field>
			</div>
			<div class="flex flex-col gap-1">
			    <label class="text-gray-600" for="password">Password</label>
			    <Field
				class="ring-1 ring-gray-400 w-xs rounded-sm p-1"
				name="password"
				type="password"
				:rules="required"
				v-model="password"
			    />
			    <ErrorMessage class="text-red-400" as="small" name="password" />
			</div>
			<div class="flex flex-col gap-1">
			    <label class="text-gray-600" for="confirmPassword">Confirm Password</label>
			    <Field
				class="ring-1 ring-gray-400 w-xs rounded-sm p-1"
				name="confirmPassword"
				type="password"
				:rules="required"
				v-model="confirmPassword"
			    />
			</div>
			<Button :disabled="!passwordsMatch">Submit</Button>
		    </Form>
		    <Form @submit="onSubmit" v-else class="flex flex-col gap-8">
			<h1 class="text-3xl text-center font-medium">Login</h1>
			<span v-if="authError" class="text-center text-red-400">Wrong credentials</span>
			<div class="flex flex-col gap-1">
			    <label class="text-gray-600" for="email">Email</label>
			    <Field
				class="ring-1 ring-gray-400 w-xs rounded-sm p-1"
				name="email"
				type="email"
				:rules="emailRules"
				v-model="email"
				placeholder="youremail@domain.com"
			    />
			    <ErrorMessage class="text-red-400" as="small" name="email" />
			</div>
			<div class="flex flex-col gap-1">
			    <label class="text-gray-600" for="password">Password</label>
			    <Field
				class="ring-1 ring-gray-400 w-xs rounded-sm p-1"
				name="password"
				type="password"
				:rules="required"
				v-model="password"
			    />
			    <ErrorMessage class="text-red-400" as="small" name="password" />
			</div>
			<Button>Login</Button>
		    </Form>
		</div>
	    </div>
	</div>
    </div>
</template>
