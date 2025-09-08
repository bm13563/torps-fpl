import { createRouter, createWebHashHistory } from "vue-router"

import Main from "./pages/Main.vue"
import TeamPicker from "./pages/TeamPicker.vue"

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  // {
  //   path: "/team-picker",
  //   name: "team-picker",
  //   component: TeamPicker,
  // },
  {
    path: "/team-picker",
    redirect: "/",
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
