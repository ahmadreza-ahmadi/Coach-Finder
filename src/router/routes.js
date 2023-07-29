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
    children: [
      {
        path: 'contact',
        component: () => import('@/views/requests/ContactCoachView.vue')
      }
    ]
  },
  {
    path: '/register',
    component: () => import('@/views/coaches/CoachRegisterationView.vue')
  },
  {
    path: '/requests',
    component: () => import('@/views/requests/RequestsReceivedView.vue')
  },
  {
    path: '/:notFound(.*)*',
    component: () => import('@/views/NotFoundView.vue')

  }
]

export default routes
