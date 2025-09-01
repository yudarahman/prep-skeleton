import type { ConsMenus } from '@/types/constant/Menu';
import {
  BriefcaseBusiness,
  Cog,
  CircleUserRound,
  LayoutDashboard
} from 'lucide-react';

const menus: ConsMenus[] = [
  {
    id: 'menu-1',
    isExpanded: null,
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
    children: []
  },
  {
    id: 'menu-2',
    isExpanded: false,
    title: 'Settings',
    url: '/settings',
    icon: Cog,
    children: [
      {
        id: 'menu-2-child-1',
        title: 'Role & Permission',
        url: '/settings/roles',
        icon: BriefcaseBusiness
      },
      {
        id: 'menu-2-child-2',
        title: 'User',
        url: '/settings/users',
        icon: CircleUserRound
      }
    ]
  }
];

export { menus };