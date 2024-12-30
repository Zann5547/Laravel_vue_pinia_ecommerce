<template>
    <GuestLayout title="Set new password">
        <form class="space-y-6" action="#" method="POST">
            <div>
                <label
                    for="password"
                    class="block text-sm/6 font-medium text-gray-900"
                    >New Password</label
                >
                <div class="mt-2">
                    <input
                        type="new_password"
                        name="new_password"
                        id="new_password"
                        autocomplete="new_password"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <div class="flex items-center justify-between">
                    <label
                        for="confirm_password"
                        class="block text-sm/6 font-medium text-gray-900"
                        >Confirm Password</label
                    >
                </div>
                <div class="mt-2">
                    <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        autocomplete="confirm_password"
                        class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit
                </button>
            </div>
        </form>

        <p class="mt-10 text-center text-sm/6 text-gray-500">
            <router-link
                :to="{ name: 'login' }"
                class="font-semibold text-indigo-600 hover:text-indigo-500"
                >Go back to Login</router-link
            >
        </p>
    </GuestLayout>
</template>

<script setup>
import GuestLayout from "../layouts/GuestLayout.vue";
</script>
