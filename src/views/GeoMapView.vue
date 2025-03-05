<template>
  <div id="geomap"></div>
</template>

<script setup>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import {ref, onMounted, watch} from "vue";

const items = ref([]);
const center = [49.01655, 8.40485];
const zoom = 18;
let geomap = null;

onMounted(async () => {
  try {
    const response = await fetch("http://localhost:3000/api/data");
    items.value = await response.json();
    markIt(items.value)
  } catch (error) {
    console.error("Error fetching data:", error);
  }
  setupLeaflet();
});
const delay = ms => new Promise(res => setTimeout(res, ms));
const markIt = async (data) => {
  await delay(5000);
  data.forEach(sticker => {
    L.marker([sticker.lat, sticker.long]).bindPopup(`<img src="http://localhost:9000/streetart/${sticker.imageurl}" width="300"/>`).addTo(geomap);
  })
}

function setupLeaflet() {
  geomap = L.map("geomap").setView(center, zoom);
  L.tileLayer("https://maps.synyx.codes/tile/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "(C) 2016 Nitin Pasumarthy",
  }).addTo(geomap);

  const spraycan = L.icon({
    iconUrl: "/src/assets/icons/spray-paint.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const sticker = L.icon({
    iconUrl: "/src/assets/icons/sticker.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const marker1 = L.marker([49.01655, 8.40485])
      .bindPopup(
          "<a href='https://www.w3schools.com'><img src='https://www.w3schools.com/images/w3schools_green.jpg'></a>",
      )
      .addTo(geomap);
  const marker2 = L.marker([49.0164, 8.40486], {icon: sticker}).bindPopup("Some Marker").addTo(geomap);
  const marker3 = L.marker([49.01699, 8.4048], {icon: spraycan}).bindPopup("3").addTo(geomap);

  const markers = L.markerClusterGroup();
  markers.addLayer(marker1);
  markers.addLayer(marker2);
  markers.addLayer(marker3);
  geomap.addLayer(markers);
}

</script>

<style scoped>
#geomap {
  height: 100vh;
  border-radius: 5px;
}
</style>
