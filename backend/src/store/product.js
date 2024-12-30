import { defineStore } from "pinia";
import axiosClient from "../axios";
export const useProductStore = defineStore("productStore", {
    state: () => {
        return {
            loading: false,
            errors: {},
            product: [],
            products: {},
        };
    },
    actions: {
        async getAllProducts(
            page = 1,
            perPage = 10,
            search = "",
            sortField = "updated_at",
            sortDirection = "desc"
        ) {
            this.loading = true;
            this.errors = {};
            try {
                const params = {
                    page,
                    per_page: perPage,
                    search,
                    sort_field: sortField,
                    sort_direction: sortDirection,
                };
                const response = await axiosClient.get("product", { params });

                this.products = {
                    data: response?.data?.data,
                    links: response?.data?.meta?.links,
                    total: response?.data?.meta?.total,
                    limit: response?.data?.meta?.per_page,
                    from: response?.data?.meta?.from,
                    to: response?.data?.meta?.to,
                    page: response?.data?.meta?.current_page,
                };
                // debugger;
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                this.loading = false;
            }
        },
    },
});
