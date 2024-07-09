import { createApp } from 'vue'
import '@/styles/main.scss'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue'
import { setupRouter } from '@/router'
import { setupStore } from '@/store'

const app = createApp(App)

function setupApp() {
  setupStore(app)
  setupRouter(app)
}
setupApp()

app.use(ElementPlus)
app.mount('#app')
