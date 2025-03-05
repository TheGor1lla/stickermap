<template>
  <div class="container">
    <GalleryItem
      v-for="item in items"
      :key="item.id"
      :foundBy="item.foundby"
      :title="item.itemname"
      :image-url="`http://localhost:9000/streetart/${item.imageurl}`"
    />
  </div>
  <div>
    <Paginator :rows="10" :total-records="120" />
  </div>
</template>

<script setup>
import GalleryItem from "@/components/GalleryItem.vue";
import Paginator from "primevue/paginator";
import { ref, onMounted } from "vue";
const items = ref([]);

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/api/data");
    const fetchedData = await response.json();
    items.value = fetchedData;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}
</style>
