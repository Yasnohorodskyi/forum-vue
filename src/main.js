import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from './store'

const forumApp = createApp(App)
forumApp.use(router)
forumApp.use(store)
forumApp.mount('#app')
// createApp(App).use(store).use(router).mount('#app')
