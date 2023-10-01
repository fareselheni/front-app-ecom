import { lazy } from 'react';

const AdminPanel = lazy(() => import('../pages/Admin/AdminPanel'));
const ProductList = lazy(() => import('../pages/Product/ProductList'));
const Signin = lazy(() => import('../pages/Authentication/SignIn'));
const Signup = lazy(() => import('../pages/Authentication/SignUp'));

const coreRoutes = [
  {
    path: '/signup',
    title: 'Signup',
    component: Signup,
  },
  {
    path: '/signin',
    title: 'Signin',
    component: Signin,
  },
  {
    path: '/AdminPanel',
    title: 'AdminPanel',
    component: AdminPanel,
  },
  {
    path: '/ProductList',
    title: 'ProductList',
    component: ProductList,
  },
];

const routes = [
  ...coreRoutes,
];

export default routes;
