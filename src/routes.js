import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '@/components/HelloWorld.vue'
import ListView from '@/components/Sidebar.vue'
import MapView from '@/components/GeoMap.vue'

const routes = [
    { name: 'home', path: '/', component: HomeView },
    { name: 'list', path: '/list', component: ListView },
    { name: 'map', path: '/map', component: MapView },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
