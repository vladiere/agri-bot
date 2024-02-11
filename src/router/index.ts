import { createRouter, createWebHistory } from 'vue-router';
import { useAuthUserStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { auth: true },
      component: () => import('../layouts/HomeLayout.vue'),
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/HomeView.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      meta: { auth: false },
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/:catchAll(.*)',
      name: 'not_found',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

router.beforeEach((to: any, from: any, next: any) => {
  const authStore = useAuthUserStore();
  if (to.meta.auth && !authStore.is_authenticated) {
    next({ name: 'login' });
  } else if (!to.meta.auth && authStore.is_authenticated) {
    next({ name: 'home' })
  } else {
    next();
  }
})

export default router
