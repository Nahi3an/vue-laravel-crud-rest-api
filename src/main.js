import { createApp } from 'vue'
import App from './App.vue'

import routes from './routes/routes';
import store from './store/index';

createApp(App)
.use(routes)
.use(store).mount('#app')
