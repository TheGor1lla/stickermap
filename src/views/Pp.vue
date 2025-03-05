<template>
  <div>
    <GalleryItem
      v-for="item in paginatedItems"
      :key="item.id"
      :foundBy="item.foundby"
      :title="item.itemname"
      :image-url="item.objectUrl"
    />

    <Paginator
      v-model:page="currentPage"
      :rows="rowsPerPage"
      :totalRecords="totalItems"
      :showCurrentPageReport="true"
      :rowsPerPageOptions="[10, 20, 30]"
      @page="onPageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import GalleryItem from "@/components/GalleryItem.vue";
import Paginator from "primevue/paginator";

const currentPage = ref(1);
const rowsPerPage = ref(10);
const totalItems = ref(0);
const items = ref([]);
const paginatedItems = ref([]);

const fetchItems = async () => {
  try {
    const response = await axios.get("/api/items", {
      params: {
        page: currentPage.value,
        limit: rowsPerPage.value
      }
    });

    items.value = response.data;
    totalItems.value = 100; // Get from backend...
    updatePaginatedItems();
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

const updatePaginatedItems = () => {
  const startIndex = (currentPage.value - 1) * rowsPerPage.value;
  const endIndex = startIndex + rowsPerPage.value;
  paginatedItems.value = items.value.slice(startIndex, endIndex);
};

const onPageChange = () => {
  updatePaginatedItems();
};

onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
</style>