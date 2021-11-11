import { RouteRecordRaw, RouterView } from 'vue-router'

const routes: RouteRecordRaw = {
  path: 'cms',
  component: RouterView,
  meta: {
    title: '内容',
    requiresAuth: true,
  },
  children: [
    {
      path: 'article/index',
      name: 'article-index',
      component: () => import('@/views/article/manage/index.vue'),
      meta: { // 自定义路由元数据
        title: '文章管理',
      },
    },
    {
      path: 'article_category/index',
      name: 'article_category-index',
      component: () => import('@/views/article/category/index.vue'),
      meta: {
        title: '文章分类',
      },
    },
  ],
}



export default routes
