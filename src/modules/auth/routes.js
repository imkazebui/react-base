import { lazy } from 'react';
const Login = lazy(() => import('./Login'));
const Grapes = lazy(() => import('./Grapes'))

export const routePath = {
  login: '/login',
  grapes: '/grapes',
};

export const routes = [
  {
    path: routePath.login,
    component: Login,
    exact: true,
    name: 'Login',
    showMenu: false,
    icon: <span>hello</span>,
  },
  {
    path: routePath.grapes,
    component: Grapes,
    exact: true,
    name: 'grapes',
    showMenu: false,
    icon: <span>hello</span>,
  },
];
