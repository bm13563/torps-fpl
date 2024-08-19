import { createRouter, createWebHistory } from "vue-router"

import Main from "./pages/Main.vue"

const routes = [
  {
    path: "/",
    component: Main,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_FILE_ROOT),
  routes,
})

export default router
