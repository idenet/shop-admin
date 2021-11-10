import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import elementPlus from './plugins/element-plus'

import './styles/index.scss'


const app = createApp(App)
// 自动注册全局组件
const modules = import.meta.globEager('./composables/**/index.ts')
for (const path in modules) {
  app.use(modules[path].default)
}

app.use(router).use(elementPlus).use(store, key).use(VXETable).mount('#app')
