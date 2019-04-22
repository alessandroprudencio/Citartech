import Vue from 'vue'

import App from './App.vue'
import Vuetify from 'vuetify'
Vue.use(Vuetify)
Vue.use(require('vue-moment'));

import DialogEdit from './components/DialogEdit'
import ListIssues from './components/ListIssues'
import DialogAdd from './components/DialogAdd'

Vue.component("DialogEdit", DialogEdit);
Vue.component("ListIssues", ListIssues);
Vue.component("DialogAdd", DialogAdd);


window.urlPadrao = 'https://api.github.com/repos/'
window.urlGetRepo = 'https://api.github.com/'

window.client_id = 'client_id=2c5af4efe6eb93041db9'
window.client_secret = 'client_secret=c443e33b8cbb83fc070a884c94a8d80c9653a557'
window.access_token = 'access_token=a5eb14a4d7b3288fc7948bd3fc97e279c85ceb70'

window.axios = require('axios');

import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader

new Vue({
  el: '#app',
  render: h => h(App),
})
