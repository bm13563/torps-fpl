import { createRouter, createWebHistory } from "vue-router"

import Main from "./pages/Main.vue"

const routes = [
  {
    path: "/",
    redirect: "/firsts?tab=Players",
  },
  {
    path: "/firsts",
    name: "Firsts",
    component: Main,
    props: { source: "firsts" },
  },
  {
    path: "/club",
    name: "Club",
    component: Main,
    props: { source: "club" },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.length === 0) {
//     next("/firsts?tab=Players")
//   } else {
//     next()
//   }
// })

export default router
