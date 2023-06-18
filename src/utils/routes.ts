import * as VueRouter from 'vue-router'

import LandingComponent from '@/pages/Landing.vue'
import LoginComponent from '@/pages/Login.vue'
import FinishSignupComponent from '@/pages/FinishSignup.vue'
import HomeComponent from '@/pages/Home.vue'

const routes: any = [
  { path: '/', name: 'landing', component: LandingComponent },
  { path: '/login', name: 'login', component: LoginComponent },
  { path: '/finish-signup', name: 'signup', component: FinishSignupComponent },
  {
    path: '/home',
    name: 'home',
    component: HomeComponent,
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('accessToken')

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
