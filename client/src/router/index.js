import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/LoginPage.vue"
import Register from "../views/RegisterPage.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true } // Tst7a9 connexion
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { guestOnly: true } // Ken lel mouch connecté
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { guestOnly: true } // Ken lel mouch connecté
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('user');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'login' });
  } else if (to.meta.guestOnly && token) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router