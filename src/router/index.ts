import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: () => import('../views/Home.vue') },
  { path: '/chess', component: () => import('@/views/ChessGame.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
