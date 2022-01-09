import { lazy } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';

const StaffManagement = lazy(() => import('./List'));

export const routePath = {
  staff: '/staff',
};

export const routes = [
  {
    path: routePath.staff,
    component: StaffManagement,
    exact: true,
    name: 'Staff',
    showMenu: true,
    icon: CaretDownOutlined,
  },
];
