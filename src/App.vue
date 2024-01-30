<template>
  <div id='schmap'></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

export default {
  name: "schmap",
  data() {
    return {
      center: [49.01655, 8.40485],
      zoom: 18,
      }},
  methods: {
    setupLeaflet: function () {
      const schmap = L.map("schmap").setView(this.center, this.zoom);
      L.tileLayer('https://maps/tile/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '(C) 2016 Nitin Pasumarthy'
      }).addTo(schmap);

      const spraycan = L.icon({
        iconUrl: "../public/spray-paint.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const sticker = L.icon({
        iconUrl: "../public/star.png",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
      });

      const marker1 = L.marker([49.01655, 8.40485]).bindPopup("<a hrefef='https://www.w3schools.com'><img src='https://www.w3schools.com/images/w3schools_green.jpg'></a>").addTo(schmap);
      const marker2 = L.marker([49.01640, 8.40486], {icon: sticker}).bindPopup("Some Marker").addTo(schmap);
      const marker3 = L.marker([49.01699, 8.40480], {icon: spraycan})
          .bindPopup("3")
          .addTo(schmap);

      // alert(marker4.getLatLng())

      // const markers = L.markerClusterGroup();
      // markers.addLayer(marker1);
      // markers.addLayer(marker2);
      // markers.addLayer(marker3);
      // map.addLayer(markers);
    }
  },
  mounted() {
    this.setupLeaflet();
  },
};
</script>

<style>
#schmap {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
