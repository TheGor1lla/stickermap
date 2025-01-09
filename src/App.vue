<template>
  <div>
    <nav class="navbar">
      <Navbar/>
    </nav>
    <main class="map">
      <RouterView/>
    </main>
  </div>
</template>

<script>
import GeoMap from "@/components/GeoMap.vue";
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";

export default {
  components: {
    Navbar,
    Sidebar,
    GeoMap
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}

.navbar {
  z-index: -1;
}

.map {
}




.parent {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.child {
  flex: 1;
}
</style>
