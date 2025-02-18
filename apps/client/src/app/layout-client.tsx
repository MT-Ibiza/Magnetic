import {
  HeaderClient,
  Sidebar,
  AvatarDropdown,
  ThemeSelector,
} from '@magnetic/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaUserFriends, FaShoppingCart, FaBook } from 'react-icons/fa';
import { SiTask } from 'react-icons/si';
import { MdDashboardCustomize } from 'react-icons/md';
import { useAuth } from './hooks/useAuth';
import { User } from 'libs/interfaces/src/lib/users';
import { FiBookOpen, FiShoppingCart, FiUser } from 'react-icons/fi';
import CartShopping from './components/cart/cart-shopping';

interface Props {}

function Layout(props: Props) {
  const { logoutClient, getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const location = useLocation();
  const { pathname } = location;
  const [isSidebarVisible, setSidebarVisible] = useState(
    window.innerWidth >= 1024
  );
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    if (isMobile) {
      setSidebarVisible(false);
    }
  }, [pathname]);

  const navigation = [
    {
      text: 'Dashboard',
      key: 'dashboard',
      url: '/dashboard',
      icon: MdDashboardCustomize,
    },
    {
      text: 'Services',
      key: 'services',
      url: '/services',
      icon: SiTask,
    },
    {
      text: 'Bookings',
      key: 'bookings',
      url: '/bookings',
      icon: FaBook,
    },
    // {
    //   text: 'My Orders',
    //   key: 'orders',
    //   url: '/orders',
    //   icon: FaShoppingCart,
    // },
    {
      text: 'Packages',
      key: 'packages',
      url: '/packages',
      icon: FaUserFriends,
    },
  ];

  const navigationOptions = [
    { name: 'Account', href: '/account', icon: FiUser },
    { name: 'Bookings', href: '/bookings', icon: FiBookOpen },
    // { name: 'Orders', href: '/orders', icon: FiShoppingCart },
  ];

  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderClient
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      >
        <div className="flex items-center gap-4">
          <ThemeSelector uniqueKey={'client'} />
          <CartShopping />
          {user && (
            <AvatarDropdown
              logout={logoutClient}
              user={user as User}
              options={navigationOptions}
            />
          )}
        </div>
      </HeaderClient>
      <div className="flex flex-1">
        <div className="container mt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
