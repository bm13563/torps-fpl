import Aura from "@primevue/themes/lara"
import PrimeVue from "primevue/config"
import { definePreset } from '@primevue/themes';
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

const MyPreset = definePreset(Aura, {
  semantic: {
      primary: {
          50: '{indigo.50}',
          100: '{indigo.100}',
          200: '{indigo.200}',
          300: '{indigo.300}',
          400: '{indigo.400}',
          500: '{indigo.500}',
          600: '{indigo.600}',
          700: '{indigo.700}',
          800: '{indigo.800}',
          900: '{indigo.900}',
          950: '{indigo.950}'
      }
  }
});

const app = createApp(App)

app.use(router)

app.mount("#app")

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
})