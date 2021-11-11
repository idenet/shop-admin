import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import AppLayoutVue from '@/layout/AppLayout.vue'
import productRoutes from './modules/product'
import settingRoutes from './modules/setting'
import systemRoutes from './modules/system'
import articleRoutes from './modules/article'
import { store } from '@/store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayoutVue,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home/index.vue'),
        meta: {
          title: '首页',
        },
      },
      productRoutes,
      settingRoutes,
      systemRoutes,
      articleRoutes,
    ],

  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
  },

]

const router = createRouter({
  history: createWebHashHistory(), // 路由模式
  routes: routes, // 路由规则
})

router.beforeEach((to) => {
  nprogress.start()
  if (to.meta.requiresAuth && !store.state.user) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

router.afterEach(() => {
  nprogress.done()
})

export default router
