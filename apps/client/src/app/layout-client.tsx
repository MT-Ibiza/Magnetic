import {
  HeaderApp,
  Sidebar,
  AvatarDropdown,
  ThemeSelector,
} from '@magnetic/ui';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FaUserFriends, FaShoppingCart } from 'react-icons/fa';
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
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isCartOpen, setCartOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

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
      text: 'My Orders',
      key: 'orders',
      url: '/orders',
      icon: FaUserFriends,
    },
  ];

  const navigationOptions = [
    { name: 'Account', href: '/account', icon: FiUser },
    { name: 'Booking', href: '/', icon: FiBookOpen },
  ];

  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderApp
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      >
        <div className="flex items-center gap-4">
          <ThemeSelector uniqueKey={'client'} />
          {user && (
            <AvatarDropdown
              logout={logoutClient}
              user={user as User}
              options={navigationOptions}
            />
          )}
          <CartShopping />
        </div>
      </HeaderApp>
      <div className="flex flex-1">
        <Sidebar
          options={navigation}
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`bg-base-200 flex-1 p-4 transition-all duration-300 ${
            isSidebarVisible ? 'ml-[260px]' : 'ml-0'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
