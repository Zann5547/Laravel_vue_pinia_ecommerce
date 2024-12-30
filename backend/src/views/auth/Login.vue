<template>
    <GuestLayout title="Sign in to your account">
        <form class="space-y-6" method="POST" @submit.prevent="loginUser">
            <div>
                <label
                    for="email"
                    class="block text-sm/6 font-medium text-gray-900"
                    >Email address</label
                >
                <div class="mt-2">
                    <input
                        v-model="user.email"
                        type="email"
                        name="email"
                        id="email"
                        autocomplete="email"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <span class="text-xs text-red-500" v-if="errors?.email">{{
                        errors.email[0]
                    }}</span>
                    <span class="text-xs text-red-500" v-if="errors?.general">{{
                        errors.general
                    }}</span>
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="password"
                        class="block text-sm/6 font-medium text-gray-900"
                        >Password</label
                    >
                    <div class="text-sm">
                        <router-link
                            :to="{ name: 'requestPassword' }"
                            class="font-semibold text-indigo-600 hover:text-indigo-500"
                            >Forgot password?</router-link
                        >
                    </div>
                </div>
                <div class="mt-2">
                    <input
                        v-model="user.password"
                        type="password"
                        name="password"
                        id="password"
                        autocomplete="current-password"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                    <span
                        class="text-xs text-red-500"
                        v-if="errors?.password"
                        >{{ errors.password[0] }}</span
                    >
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    :class="{ 'cursor-not-allowed': loading }"
                >
                    <svg
                        v-if="authStore.loading"
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    Sign in
                </button>
            </div>
        </form>
    </GuestLayout>
</template>

<script setup>
import { computed, onMounted, reactive } from "vue";
import { useAuthStore } from "../../store/auth";
import GuestLayout from "../layouts/GuestLayout.vue";

const authStore = useAuthStore();
const errors = computed(() => authStore.errors);
const loading = computed(() => authStore.loading);
const user = reactive({
    email: "",
    password: "",
    remember: false,
});

const loginUser = () => {
    authStore.login(user);
};
onMounted(() => {
    authStore.errors = {};
});
</script>
