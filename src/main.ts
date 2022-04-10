import { createApp } from 'vue'
import App from './App.vue'
import { key, store } from './store'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router'

createApp(App).use(router).use(store, key).mount('#app')
