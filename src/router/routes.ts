import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/secrets' ,
  },

  {
    path: '/secrets',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/index.vue') }],
  },

  {
    path: '/keys',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/keys.vue') }],
  },

  {
    path: '/folders',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/folders.vue') }],
  },

  {
    path: '/legal',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/legal.vue') }],
  },

  {
    path: '/settings',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('src/pages/settings.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('src/pages/error_404.vue'),
  },
];

export default routes;
