import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue'),
    },
    {
      path: '/forecast',
      name: 'forecast',
      component: () => import(/* webpackChunkName: "forecast" */ '../views/ForecastView.vue')
    },
    {
      path: '/hourly',
      name: 'hourly',
      component: () => import(/* webpackChunkName: "hourly" */ '../views/HourlyView.vue')
    },
  ],
})


export default router
