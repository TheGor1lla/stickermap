import {createRouter, createWebHistory} from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import GalleryView from '@/views/GalleryView.vue'
import MapView from '@/views/GeoMapView.vue'

const routes = [
    { name: 'home', path: '/', component: HomeView },
    { name: 'gallery', path: '/gallery', component: GalleryView },
    { name: 'map', path: '/map', component: MapView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
