import { definePreset } from "@primevue/themes"
import Aura from "@primevue/themes/lara"
import PrimeVue from "primevue/config"
import { createApp } from "vue"

import App from "./App.vue"
import router from "./router"

const MyPreset = definePreset(Aura, {
  semantic: {
    transitionDuration: "0.05s",
    primary: {
      50: "{orange.50}",
      100: "{orange.100}",
      200: "{orange.200}",
      300: "{orange.300}",
      400: "{orange.400}",
      500: "{orange.500}",
      600: "{orange.600}",
      700: "{orange.700}",
      800: "{orange.800}",
      900: "{orange.900}",
      950: "{orange.950}",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#fffdf9",
          50: "{orange.50}",
          100: "{orange.100}",
          200: "{orange.200}",
          300: "{orange.300}",
          400: "{orange.400}",
          500: "{orange.500}",
          600: "{orange.600}",
          700: "{orange.700}",
          800: "{orange.800}",
          900: "{orange.900}",
          950: "{orange.950}",
        },
        formField: {
          disabledBackground: "#f5f5f5",
          disabledColor: "#b3b3b3",
        },
        text: {
          color: "#000",
        },
      },
    },
  },
})

const app = createApp(App)

app.use(router)

app.mount("#app")

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: ".fake-dark-selector",
    },
  },
})
