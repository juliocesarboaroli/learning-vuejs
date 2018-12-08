import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';

import { routes } from './routes';

import msg from './pt_BR';

import './directives/Transform';

// registrando o módulo/plugin no global view object
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate, {
  locale: 'pt_Br',
  dictionary: {
    pt_Br: {
      messages: msg
    }
  }
});

//mode: history para remover #
const router = new VueRouter({
  routes
});

//http usará sempre o endereço abaixo
Vue.http.options.root = 'http://localhost:3000';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
