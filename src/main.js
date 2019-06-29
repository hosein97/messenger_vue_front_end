import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  http
} from './axios';
import setAuth from "./set-auth";

Vue.config.productionTip = false

import ChatApp from './components/ChatApp'

setAuth(http)

Vue.component(ChatApp.name, ChatApp);

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')