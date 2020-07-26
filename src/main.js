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

Vue.mixin({
  data() {
    return {
      // 브랜드 컬러 간소화
      // 글씨, 아이콘
      brandColor: {
        primary : { color: '#000000' },
        brand : { color: '#000000' },
        main : { color: '#000000' },
        sub : { color: '#000000' },
        mainLine : { color: '#000000' },
        subLine : { color: '#000000' },
        help : { color: '#000000' },
        white: { color: 'white' },
        reverse : { color: '#000000' },
      },
      // 배경
      brandBgColor: {
        primary : { backgroundColor:'#000000'},
        brand : { backgroundColor: '#000000' },
        main : { backgroundColor: '#000000' },
        sub : { backgroundColor: '#000000' },
        alert: { backgroundColor: '#FF5D5D' },
        white: { backgroundColor: 'white' },
      },
      // 테두리선
      brandBorder: {
        brand: { border: `1px solid '#000000` },
        main: { border: `1px solid '#000000` },
        sub: { border: `1px solid '#000000` },
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user;
    },
    radius() {
      return '0px';
    },
    // 로그인 여부
    isLogin() {
      return this.$store.getters.user.user_id > 0;
    },
    pagePadding() {
      let padding = '16px';
      return {
        paddingLeft: padding,
        paddingRight: padding
      }
    },
  },
  methods: {
    toast(msg) {
      this.$root.$emit('toast', msg);
    },
    routerPush(path) {
      if(this.$route.meta) {
        this.$route.meta.clickPush = true;
      }

      this.$router.push(path);
    },
    setAuthHeader() {
      //this.$axios.defaults.headers.common['Authorization'] = 'Token 8144965aed93722f9f2a56573054ed5357a2bee4';
      this.$axios.defaults.headers.common['Authorization'] = 'Token ' + this.$store.getters.user.token;
    },
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
