<template>
    <div>
        <div class="flex items-center justify-between mb-3">
            <h1 class="text-3xl font-semibold">Products</h1>
            <button
                class="flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 transition-colors"
                type="submit"
            >
                Add new product
            </button>
        </div>
        <ProductsTable />
    </div>
</template>

<script setup>
import ProductsTable from "./ProductsTable.vue";
</script>
