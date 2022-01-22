import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'
import Home from '../views/Home.vue'
import firebase from '../firebase/index'

// Auth Guards
const requireAuth = (to, from, next) => {
  const user = firebase.auth().currentUser
  if(!user) next({name: 'Index'}) 
  else if(to.path === '/login' || to.path === '/register') next({name: 'Home'})
  else next()
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    beforeEnter: requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
