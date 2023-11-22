import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router';

import Home from '@/views/HomeView.vue';
import Jobs from '@/views/JobsView.vue';
import Users from '@/views/UsersView.vue';
import JobDetail from '@/views/JobDetailView.vue';
import UserDetail from '@/views/UserDetailView.vue';
import AddJob from '@/views/AddJobView.vue';
import Login from '@/views/LoginView.vue';
import Register from '@/views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Login' },
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: 'Register' },
    component: Register,
  },
  {
    path: '/jobs',
    name: 'Jobs',
    children: [
      {
        path: '',
        name: 'Jobs',
        component: Jobs,
      },
      {
        path: ':id',
        name: 'Job',
        component: JobDetail,
        props: true,
      },
    ],
  },
  {
    path: '/users',
    name: 'Users',
    children: [
      {
        path: '',
        name: 'Useres',
        component: Users,
      },
      {
        path: ':id',
        name: 'User',
        component: UserDetail,
        props: true,
      },
    ],
  },
  {
    path: '/jobs/add',
    name: 'Add job',
    component: AddJob,
  },
] as RouteRecordRaw[];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
