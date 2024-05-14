import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import StyleManager from "./styleManager";
// import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.min.css';

// createApp(App).use(router).mount('#app')
const app = createApp(App);
// app.config.globalProperties.$styleManager = StyleManager;
app.use(router);
app.mount("#app");
