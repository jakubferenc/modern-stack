import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';

import './style.css';
import App from './App.vue';
import router from '@/router/index';
import config from './config/index';
import ToastService from 'primevue/toastservice';
const pinia = createPinia();

const app = createApp(App);

app.config.globalProperties.$config = config;

app
  .use(router)
  .use(pinia)
  .use(PrimeVue, { unstyled: false })
  .use(ToastService)
  .mount('#app');
