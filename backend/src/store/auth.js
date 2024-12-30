import { defineStore } from "pinia";
import axiosClient from "../axios";

export const useAuthStore = defineStore("authStore", {
    state: () => {
        return {
            loading: false,
            user: null,
            token: sessionStorage.getItem("TOKEN") || null,
            errors: {},
        };
    },
    actions: {
        async getUser() {
            this.loading = true;
            this.errors = {};
            try {
                const response = await axiosClient.get("user", {
                    headers: { Authorization: `Bearer ${this.token}` },
                });
                this.user = response?.data?.data;
            } catch (error) {
                if (error.response && error.response?.data?.message) {
                    this.errors.general = error.response?.data?.message;
                }
            } finally {
                this.loading = false;
            }
        },

        async login(user) {
            this.loading = true;
            this.errors = {};
            try {
                const response = await axiosClient.post("login", user);
                this.user = response?.data?.user;
                this.token = response?.data?.token;
                sessionStorage.setItem("TOKEN", this.token);
                this.router.push({ name: "app.dashboard" });
            } catch (error) {
                if (error.response) {
                    if (error.response.data.message) {
                        this.errors.general = error.response?.data?.message;
                    }
                    if (error.response.data.errors) {
                        this.errors = error.response?.data?.errors;
                    }
                } else {
                    this.errors.general = "An unexpected error occurred.";
                }
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            this.loading = true;
            try {
                axiosClient.post("logout");
                (this.user = null), (this.token = null);
                sessionStorage.removeItem("TOKEN");
                this.router.push({ name: "login" });
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                this.loading = false;
            }
        },
    },
});
