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

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'


// import Echo from 'laravel-echo';
// import setEcho from './set-echo';


Vue.config.productionTip = false

import ChatApp from './components/ChatApp'
Vue.use(Antd)
setAuth(http)
// setEcho(Echo)

// window.Echo.private('some-private-channel')
//   .listen('SomeEvent', (e) => {
//     console.log(e);
//   });


Vue.component(ChatApp.name, ChatApp);

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')