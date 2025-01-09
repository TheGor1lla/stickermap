import { createMemoryHistory, createRouter } from 'vue-router'

import ListView from '@/components/ListView.vue'
import MapView from '@/components/MapView.vue'
import HelloWorld from "@/components/HelloWorld.vue";

const routes = [
    { name: 'home', path: '/', component: HelloWorld },
    { name: 'list', path: '/list', component: ListView },
    { name: 'map', path: '/map', component: MapView },
]

export const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

