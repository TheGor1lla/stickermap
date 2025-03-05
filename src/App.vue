<template>
  <div class="view">
    <nav class="navbar">
      <Navbar />
    </nav>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script>
import GeoMap from "@/views/GeoMapView.vue";
import Sidebar from "@/views/GalleryViewPaginated.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    GeoMap,
  },
};
</script>

<style scoped>
.view {
  height: 100vh;
}
.navbar {
  z-index: -1;
}
</style>
