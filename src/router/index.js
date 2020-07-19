import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Product from '../views/Product.vue'
import Profile from '../views/Profile.vue'
import Main from '../views/Main.vue'
Vue.use(VueRouter)

const routes = [
  // { path: '/', name: 'home', component: Home },
  { path: '/',
    component: Main,
    children: [
      { path: '/home', name: 'Home', component: Home },
      { path: '/product', name: 'Product', component: Product },
      { path: '/profile', name: 'Profile', component: Profile }
    ]
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
