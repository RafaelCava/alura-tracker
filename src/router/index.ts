import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: () => import('@/views/Tarefas.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
