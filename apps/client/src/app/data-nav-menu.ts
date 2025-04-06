import { MegamenuItem, NavItemType } from './components/menu-item-nav';
import { useAuth } from './hooks/useAuth';

export default function ncNanoId(prefix = 'nc_') {
  return prefix + Date.now() + '_' + Math.floor(Math.random() * 9999999999);
}

// const { logoutClient, getCurrentUser } = useAuth();

export const NAVIGATION_DEMO = (): NavItemType[] => {
  const { logoutClient } = useAuth();

  return [
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
      href: '/cart',
      name: 'Cart',
    },
    {
      id: ncNanoId(),
      href: '/account',
      name: 'Account',
    },
    {
      id: ncNanoId(),
      name: 'Logout',
      onClick: logoutClient,
    },
  ];
};
