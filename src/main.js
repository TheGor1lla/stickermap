import { createApp } from "vue";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "primeicons/primeicons.css";
import { router } from "./routes";
import { definePreset } from "@primevue/themes";

const app = createApp(App);

const myPreset = definePreset(Aura, {
  components: {
    menubar: {
      background: "#26b92e",
      item: {
        active: {
          background: "darkblue",
          color: "darkblue",
        },
      },
    },
  },
});

app.use(PrimeVue, {
  theme: {
    preset: myPreset,
    options: {
      darkModeSelector: false,
    },
  },
});

app.use(router);

app.mount("#app");
