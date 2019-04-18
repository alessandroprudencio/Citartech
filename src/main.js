import Vue from 'vue'

import App from './App.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
Vue.use(require('vue-moment'));

window.axios = require('axios');

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

new Vue({
  el: '#app',
  render: h => h(App),
})
