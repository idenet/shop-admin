import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'system',
  component: RouterView,
  meta: {
    title: '维护',
    requiresAuth: true,
  },
  children: [
    {
      path: 'file/index',
      name: 'system-file',
      component: () => import('@/views/system/file/index.vue'),
      meta: { // 自定义路由元数据
        title: '附件管理',
      },
    },
  ],
}

export default routes
