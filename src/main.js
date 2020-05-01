import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
import store from "./store/index"

import VueRouter from "vue-router";
import definedRoutes from "./router/index";
Vue.use(VueRouter); //enabling routing
// Register it globally

const router = new VueRouter({
  routes: definedRoutes,
  mode: "history"
});


new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
