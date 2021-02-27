import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/tab-bar/home')
      },
      {
        path: '/wenda',
        name: 'wenda',
        component: () => import('@/views/tab-bar/wenda')
      },
      {
        path: '/shipin',
        name: 'shipin',
        component: () => import('@/views/tab-bar/shipin')
      },
      {
        path: '/mine',
        name: 'mine',
        component: () => import('@/views/tab-bar/mine')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
