import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
// import { LoadingPlugin, ErrorPlugin } from 'vue-loading-overlay';

const app = createApp(App);

app.use(store);
// app.use(LoadingPlugin);
// app.use(ErrorPlugin);

app.mount('#app');
