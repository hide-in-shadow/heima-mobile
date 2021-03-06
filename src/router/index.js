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
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article'),
    // 将路由动态参数映射到组件的 props 中，更推荐这种做法
    props: true
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user-profile/index.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
