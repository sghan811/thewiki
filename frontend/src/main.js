import {createApp} from 'vue'
import App from './App.vue'
import router from './vue-routers'
import vueCookies from "vue-cookies";
import store from './vuex/store';


const app = createApp(App)
app.config.globalProperties.$store = store
app.use(vueCookies);
app.$cookies.config("7d");
app.use(router).mount('#app')

