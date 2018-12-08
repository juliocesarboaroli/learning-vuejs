import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource';
import VueRouter from 'vue-router';

import { routes } from './routes';

import './directives/Transform';

// registrando o módulo/plugin no global view object
Vue.use(VueResource);
Vue.use(VueRouter);

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
