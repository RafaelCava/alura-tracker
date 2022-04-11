import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Tarefas',
    component: () => import('@/views/Tarefas.vue')
  },
  {
    path: '/projetos',
    component: () => import('@/views/Projetos.vue'),
    children: [
      {
        path: '',
        name: 'Projetos',
        component: () => import('@/views/Projetos/Lista.vue')
      },
      {
        path: 'novo',
        name: 'Novo Projeto',
        component: () => import('@/views/Projetos/Formulario.vue')
      },
      {
        path: ':id',
        name: 'Editar Projeto',
        component: () => import('@/views/Projetos/Formulario.vue'),
        props: true
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
