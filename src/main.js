import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css' // مهم لو تستعمل تايلويند
import 'leaflet/dist/leaflet.css'


createApp(App).use(router).mount('#app')
