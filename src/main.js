import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.css';

import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import 'primevue/resources/themes/lara-light-green/theme.css';

const app = createApp(App);

app.use(PrimeVue);
app.use(ToastService);

app.mount('#app');
