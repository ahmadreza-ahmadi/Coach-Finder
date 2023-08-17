const routes = [
  {
    path: '/',
    redirect: '/coaches'
  },
  {
    path: '/coaches',
    component: () => import('@/views/coaches/CoachesListView.vue')
  },
  {
    path: '/coaches/:id',
    component: () => import('@/views/coaches/CoachDetailView.vue'),
    props: true,
    children: [
      {
        path: 'contact',
        component: () => import('@/views/requests/ContactCoachView.vue')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/coaches/CoachRegisterationView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/requests',
    component: () => import('@/views/requests/RequestsReceivedView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/auth',
    component: () => import('@/views/auth/UserAuth.vue'),
    meta: { requiresUnauth: true }
  },
  {
    path: '/:notFound(.*)*',
    component: () => import('@/views/NotFoundView.vue')
  }
]

export default routes
