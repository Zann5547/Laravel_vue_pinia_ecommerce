<template>
    <div class="bg-white p-4 rounded-lg shadow">
        <div class="flex justify-between border-b-2 pb-3">
            <div class="flex items-center">
                <span class="whitespace-normal mr-3">Per Page</span>
                <select
                    v-model="perPage"
                    @change="handlePerPage"
                    class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
            <div>
                <input
                    v-model="search"
                    @change="handleSearch"
                    placeholder="Type to Search Products"
                    class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                />
            </div>
        </div>
        <table class="table-auto w-full">
            <thead>
                <tr>
                    <TableHeaderCell
                        @click="sortProduct"
                        class="border-b-2 p-2 text-left"
                        field="id"
                        :sort-field="sortField"
                        :sort-direction="sortDirection"
                        >ID</TableHeaderCell
                    >
                    <TableHeaderCell
                        class="border-b-2 p-2 text-left"
                        field=""
                        :sort-field="sortField"
                        :sort-direction="sortDirection"
                        >Image</TableHeaderCell
                    >
                    <TableHeaderCell
                        @click="sortProduct"
                        class="border-b-2 p-2 text-left"
                        field="title"
                        :sort-field="sortField"
                        :sort-direction="sortDirection"
                        >Title</TableHeaderCell
                    >
                    <TableHeaderCell
                        @click="sortProduct"
                        class="border-b-2 p-2 text-left"
                        field="price"
                        :sort-field="sortField"
                        :sort-direction="sortDirection"
                        >Price</TableHeaderCell
                    >
                    <TableHeaderCell
                        @click="sortProduct"
                        class="border-b-2 p-2 text-left"
                        field="updated_at"
                        :sort-field="sortField"
                        :sort-direction="sortDirection"
                        >Last Updated At</TableHeaderCell
                    >
                </tr>
            </thead>
            <tbody v-if="loading">
                <tr>
                    <td colspan="5">
                        <Spinner class="mt-6" v-if="loading" />
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-for="product in products.data" :key="product.id">
                    <td class="border-b p-2">{{ product.id }}</td>
                    <td class="border-b p-2">
                        <img
                            :src="product.image"
                            :alt="product.title"
                            class="w-16"
                        />
                    </td>
                    <td
                        class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                        {{ product.title }}
                    </td>
                    <td class="border-b p-2">{{ product.price }}</td>
                    <td class="border-b p-2">{{ product.updated_at }}</td>
                </tr>
            </tbody>
        </table>
        <div
            class="flex justify-between items-center mt-5"
            v-if="!products?.loading"
        >
            <span> Showing from {{ products.from }} to {{ products.to }} </span>
            <nav
                v-if="products.total > products.limit"
                class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
            >
                <a
                    v-for="(link, i) of products.links"
                    :key="i"
                    :disabled="!link.url"
                    href="#"
                    @click.prevent="getForPage($event, link)"
                    aria-current="page"
                    class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
                    :class="[
                        link.active
                            ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                        i === 0 ? 'rounded-l-md' : '',
                        i === products.links.length - 1 ? 'rounded-r-md' : '',
                        !link.url
                            ? 'bg-gray-100 text-gray-700 cursor-not-allowed'
                            : '',
                    ]"
                    v-html="link.label"
                ></a>
            </nav>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useProductStore } from "../../../store/product";
import Spinner from "../../components/core/Spinner.vue";
import TableHeaderCell from "../../components/core/table/TableHeaderCell.vue";
import { PAGE, PRODUCTS_PER_PAGE } from "../../../constants";

const productStore = useProductStore();
const loading = computed(() => productStore.loading);
const products = computed(() => productStore.products);
const page = ref(PAGE);
const perPage = ref(PRODUCTS_PER_PAGE);
const search = ref("");
const sortField = ref("updated_at");
const sortDirection = ref("desc");

const fetchProducts = (options = {}) => {
    productStore.getAllProducts(
        options.page ?? page.value,
        options.perPage ?? perPage.value,
        options.search ?? search.value,
        options.sortField ?? sortField.value,
        options.sortDirection ?? sortDirection.value
    );
};

const getForPage = (ev, link) => {
    if (!link.url || link.active) {
        return;
    }
    const page = new URL(link.url).searchParams.get("page") || 1;
    fetchProducts({ page: Number(page) });
};

const handlePerPage = () => {
    fetchProducts();
};
const handleSearch = () => {
    fetchProducts();
};
const sortProduct = (field) => {
    if (sortField.value === field) {
        sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
        sortField.value = field;
        sortDirection.value = "asc";
    }
    fetchProducts();
};

onMounted(() => {
    productStore.getAllProducts();
});
</script>
