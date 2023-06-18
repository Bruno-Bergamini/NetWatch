import * as VueRouter from 'vue-router'

import FinishSignupComponent from '@/pages/FinishSignup.vue'
import HomeComponent from '@/pages/Home.vue'

const routes: any = [
  { path: '/', name: 'landing', component: LandingComponent },
  { path: '/login', name: 'login', component: HomeComponent },
  { path: '/finish-signup', name: 'signup', component: FinishSignupComponent },
  {
    path: '/home',
    name: 'home',
    component: HomeComponent
  },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
})

export default router
