import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import AppLayoutVue from '@/layout/AppLayout.vue'
import productRoutes from './modules/product'
import settingRoutes from './modules/setting'
import systemRoutes from './modules/system'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: AppLayoutVue,
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('../views/home/index.vue'),
      },
      productRoutes,
      settingRoutes,
      systemRoutes,
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

export default router
