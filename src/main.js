import Aura from "@primevue/themes/lara"
import PrimeVue from "primevue/config"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

const app = createApp(App)
app.use(router)
app.mount("#app")
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})
