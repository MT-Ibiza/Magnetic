import { MegamenuItem, NavItemType } from './components/menu-item-nav';

export default function ncNanoId(prefix = 'nc_') {
  return prefix + Date.now() + '_' + Math.floor(Math.random() * 9999999999);
}

export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: '/dashboard',
    name: 'Dashboard',
  },
  {
    id: ncNanoId(),
    href: '/services',
    name: 'Services',
  },
  {
    id: ncNanoId(),
    href: '/bookings',
    name: 'Bookings',
  },
  {
    id: ncNanoId(),
    href: '/packages',
    name: 'Packages',
  },

  {
    id: ncNanoId(),
    href: '/account',
    name: 'Account',
  },
];
