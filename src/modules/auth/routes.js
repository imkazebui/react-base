import React, { lazy } from 'react';
const Login = lazy(() => import('./Login'));

export const routePath = {
  login: '/login',
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
];
