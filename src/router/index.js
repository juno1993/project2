import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Profile from '../views/Profile.vue'

function loadMobile(component) {
  // '@' is aliased to src/components
  return () => import(`../views_mobile/${component}`)
}

function loadPc(component) {
  // '@' is aliased to src/module
  return () => import(`../views/${component}`)
}

Vue.use(VueRouter)

let routes = []
if (navigator.userAgent.match(/Android/i)
    || navigator.userAgent.match(/webOS/i)
    || navigator.userAgent.match(/iPhone/i)
    || navigator.userAgent.match(/iPad/i)
    || navigator.userAgent.match(/iPod/i)
    || navigator.userAgent.match(/BlackBerry/i)
    || navigator.userAgent.match(/Windows Phone/i)
) {
  // 모바일 페이지
  routes = [
    {
      path: '/',
      component: loadMobile('Main'),
      children: [
        { path: '/home', name: 'Home', component: loadMobile('Home') },
        { path: '/login', component: loadMobile('Login') },
        { path: '/mypage', component: loadMobile('MyPage') },
        { path: '/feed_create', component: loadMobile('FeedCreate') },
        {path: '/profile', component: loadMobile('Profile')},
        {path: '/signup', component: loadMobile('Signup')}
      ]
    }
  ]
}
// PC 페이지
else {
  if(window.innerWidth>420) {
    routes = [
      // { path: '/', name: 'home', component: Home },
      {
        path: '/',
        component: loadPc('Main'),
        children: [
          {path: '/home', component: loadPc('Home')},
          {path: '/product', component: loadPc('Product')},
          {path: '/profile', component: loadPc('Profile')}
        ]
      }
    ]
  }
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
