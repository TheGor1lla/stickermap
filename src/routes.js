import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue";
import GalleryView from "@/views/GalleryViewPaginated.vue";
import MapView from "@/views/GeoMapView.vue";
import AddView from "@/views/AddView.vue";

const routes = [
  { name: "home", path: "/", component: HomeView },
  { name: "gallery", path: "/gallery", component: GalleryView },
  { name: "map", path: "/map", component: MapView },
  { name: "add", path: "/add", component: AddView },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
