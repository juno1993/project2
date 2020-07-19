import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import {currency, currencyNum, currencyWon, currencyKor, thousand} from './filter.js'
require('@/assets/css/main.styl')


Vue.filter('currency', currency)
Vue.filter('currencyNum', currencyNum)
Vue.filter('currencyWon', currencyWon)
Vue.filter('currencyKor', currencyKor)
Vue.filter('thousand', thousand)
Vue.config.productionTip = false

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
