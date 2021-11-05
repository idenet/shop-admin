import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { store, key } from './store'
import elementPlus from './plugins/element-plus'

import './styles/index.scss'

createApp(App).use(router).use(elementPlus).use(store, key).mount('#app')
