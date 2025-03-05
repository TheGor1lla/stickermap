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
import { ref, onMounted } from 'vue';
import axios from 'axios';
import GalleryItem from '@/components/GalleryItem.vue'; // Assuming GalleryItem is a custom component
import Paginator from 'primevue/paginator';

const currentPage = ref(1); // Current page number
const rowsPerPage = ref(10); // Items per page
const totalItems = ref(0); // Total number of items in the database
const items = ref([]); // All items fetched from the backend
const paginatedItems = ref([]); // Items for the current page

// Fetch the data for the current page
const fetchItems = async () => {
  try {
    const response = await axios.get('/api/items', {
      params: {
        page: currentPage.value,
        limit: rowsPerPage.value,
      },
    });

    items.value = response.data;
    totalItems.value = 100; // You can get the total items count from the backend as well
    updatePaginatedItems();
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// Update the paginated items when the page changes
const updatePaginatedItems = () => {
  const startIndex = (currentPage.value - 1) * rowsPerPage.value;
  const endIndex = startIndex + rowsPerPage.value;
  paginatedItems.value = items.value.slice(startIndex, endIndex);
};

// Handle page change
const onPageChange = () => {
  updatePaginatedItems();
};

onMounted(() => {
  fetchItems();
});
</script>

<style scoped>
/* Add your styling here */
</style>