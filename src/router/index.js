import { createRouter, createWebHistory } from 'vue-router'
import Index from '../views/index.vue'
import Home from '../views/Home.vue'
import firebase from '../firebase/index'

// Auth Guards
const requireAuth = (to, from, next) => {
  const user = firebase.auth().currentUser
  if(!user) next({name: 'Index'}) 
  else next()
}

const checkUser = (to, from, next) => {
  const user = firebase.auth().currentUser
  if(user && to.path === '/login' || user && to.path === '/register' || user && to.path === '/') next({name: 'Home'})
  else next()
}

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    beforeEnter: checkUser
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
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    beforeEnter: checkUser
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    beforeEnter: checkUser
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import(/* webpackChunkName: "reset-password" */ '../views/ResetPassword.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/budget',
    name: 'Budget',
    component: () => import(/* webpackChunkName: "budget" */ '../views/Budget/Budget.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/budget/new',
    name: 'NewBudget',
    component: () => import(/* webpackChunkName: "new-budget" */ '../views/Budget/NewBudget.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/savings-plans',
    name: 'SavingsPlans',
    component: () => import(/* webpackChunkName: "savings-plans" */ '../views/SavingsPlans.vue'),
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
