import {
  HeaderApp,
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
import { FiBookOpen, FiUser } from 'react-icons/fi';
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
      text: 'Packages',
      key: 'packages',
      url: '/packages',
      icon: FaUserFriends,
    },
    {
      text: 'Bookings',
      key: 'bookings',
      url: '/bookings',
      icon: FaBook,
    },
    {
      text: 'My Orders',
      key: 'orders',
      url: '/orders',
      icon: FaShoppingCart,
    },
  ];

  const navigationOptions = [
    { name: 'Account', href: '/account', icon: FiUser },
    { name: 'Booking', href: '/bookings', icon: FiBookOpen },
    { name: 'Orders', href: '/orders', icon: FiBookOpen },
  ];

  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderApp
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
      </HeaderApp>
      <div className="flex flex-1">
        <Sidebar
          headerClassName="py-3 lg:py-[6.5px]"
          options={navigation}
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`bg-base-200 flex-1 p-4 transition-all duration-300 ${
            isSidebarVisible ? 'lg:ml-[260px]' : 'lg:ml-0'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
