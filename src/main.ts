import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'

import './styles/index.scss'


const app = createApp(App)
app.use(router)
app.use(elementPlus)
app.use(store, key)
app.use(VXETable)
// 自动注册全局组件
const modules = import.meta.globEager('./composables/**/index.ts')
for (const path in modules) {
  app.use(modules[path].default)
}

app.mount('#app')
