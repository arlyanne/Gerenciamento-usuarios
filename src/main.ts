/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App)
const pinia = createPinia();

registerPlugins(app)

app.use(pinia);
app.use(router);
app.mount('#app')
