import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SecurityView from '@/views/SecurityView.vue'
import SignIn from '@/components/SignIn.vue'
import SignUp from '@/components/SignUp.vue'
import Landing from '@/views/LandingView.vue'
import ForgotPassword from '@/components/ForgotPassword.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/security',
    name: 'security',
    component: SecurityView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'landing',
    component: Landing
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: ForgotPassword
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
