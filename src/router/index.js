import { createRouter, createWebHistory } from 'vue-router'
import Tasks from '@/views/Tasks'

const routes = [
  {
    path: '/',
    component: Tasks
  },
  {
    path: '/new',
    component: () => import(/* webpackChunkName: "about" */ '@/views/New.vue')
  },
  {
    path: '/task/:id',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Task.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active'
})

export default router
