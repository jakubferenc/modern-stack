import { createApp } from 'vue';
import PrimeVue from 'primevue/config';

import './style.css';
import App from './App.vue';
import router from '@/router/index';
import config from './config/index';

const app = createApp(App);
app.config.globalProperties.$config = config;

app.use(router).use(PrimeVue, { unstyled: true }).mount('#app');
