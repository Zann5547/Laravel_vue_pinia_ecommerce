<template>
    <div v-if="authStore?.user" class="min-h-full bg-gray-200 flex">
        <Sidebar :class="{ '-ml-[200px]': !openedSidebar }" />
        <div class="flex-1">
            <Navbar @toggle-sidebar="toggleSidebar" />
            <main class="p-6">
                <router-view></router-view>
            </main>
        </div>
    </div>
    <div
        v-else
        class="flex items-center justify-center min-h-screen bg-gray-200"
    >
        <Spinner />
    </div>
</template>

<script setup>
import Sidebar from "../components/Sidebar.vue";
import Navbar from "../components/Navbar.vue";
import Spinner from "../components/core/Spinner.vue";
import { onMounted, onUnmounted, ref } from "vue";
import { useAuthStore } from "../../store/auth";

const openedSidebar = ref(true);
const toggleSidebar = () => {
    openedSidebar.value = !openedSidebar.value;
};
const authStore = useAuthStore();
const handleResponsiveOpenedSidebar = () => {
    if (window.outerWidth <= 768) {
        openedSidebar.value = false;
    } else {
        openedSidebar.value = true;
    }
};
onMounted(() => {
    authStore.getUser();
    handleResponsiveOpenedSidebar();
    window.addEventListener("resize", handleResponsiveOpenedSidebar);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleResponsiveOpenedSidebar);
});
</script>
