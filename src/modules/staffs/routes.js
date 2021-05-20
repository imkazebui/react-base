import { lazy } from 'react';
const StaffManagement = lazy(() => import('./List'));

export const routePath = {
  staff: '/staff',
};

export const staffRoutes = [
  {
    path: routePath.STAFF,
    component: StaffManagement,
    exact: true,
    name: 'Staff',
    showMenu: true,
    icon: <span>hello</span>,
  },
];