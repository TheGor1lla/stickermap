import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import {router} from "./routes";

import 'primeicons/primeicons.css'
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";

const app = createApp(App)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    },
    ripple: true,
})

app.use(router)

app.mount('#app')
