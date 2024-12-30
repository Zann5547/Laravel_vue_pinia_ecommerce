import { createRouter, createWebHistory } from "vue-router";
import Login from "../views/auth/Login.vue";
import RequestPassword from "../views/auth/RequestPassword.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import AppLayout from "../views/layouts/AppLayout.vue";
import Dashboard from "../views/Dashboard.vue";
import Products from "../views/pages/product/Products.vue";
import NotFound from "../views/pages/NotFound.vue";
import { useAuthStore } from "../store/auth";

const routes = [
    {
        path: "/app",
        name: "app",
        component: AppLayout,
        meta: { requiresAuth: true },
        children: [
            { path: "dashboard", name: "app.dashboard", component: Dashboard },
            { path: "products", name: "app.products", component: Products },
        ],
    },
    {
        path: "/login",
        name: "login",
        meta: { requiresGuest: true },
        component: Login,
    },
    {
        path: "/request-password",
        name: "requestPassword",
        meta: { requiresGuest: true },
        component: RequestPassword,
    },
    {
        path: "/reset-password/:token",
        name: "resetPassword",
        meta: { requiresGuest: true },
        component: ResetPassword,
    },
    { path: "/:pathMatch(.*)*", name: "notFound", component: NotFound },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.token) {
        next({ name: "login" });
    } else if (to.meta.requiresGuest && authStore.token) {
        next({ name: "app.dashboard" });
    } else {
        next();
    }
});

export default router;
