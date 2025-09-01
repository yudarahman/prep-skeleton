import { Navigate } from 'react-router';

import SplashPage from '@/pages/Splash';
import AuthPage from '@/pages/Auth';
import MainPage from '@/pages/Main';
import DashboardPage from '@/pages/Dashboard';
import RolePage from '@/pages/Setting/Role';
import RoleFormPage from '@/pages/Setting/Role/Form';
import RolePermissionFormPage from '@/pages/Setting/Role/PermissionForm';
import UserPage from '@/pages/Setting/User';
import UserFormPage from '@/pages/Setting/User/Form';

const routes = [
  {
    path: '',
    element: <Navigate to="/splash" />
  },
  {
    path: 'splash',
    element: <SplashPage />
  },
  {
    path: 'login',
    element: <AuthPage />
  },
  {
    path: 'dashboard',
    element: <MainPage />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      }
    ]
  },
  {
    path: 'settings',
    element: <MainPage />,
    children: [
      {
        path: '',
        element: <Navigate to="/settings/users" />
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            element: <UserPage />
          },
          {
            path: ':type',
            element: <UserFormPage />
          }
        ]
      },
      {
        path: 'roles',
        children: [
          {
            path: '',
            element: <RolePage />
          },
          {
            path: ':type',
            element: <RoleFormPage />
          },
          {
            path: 'permission',
            element: <RolePermissionFormPage />
          }
        ]
      }
    ]
  }
];

export { routes };