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
import FooterNav from './components/footer-menu';
import Footer from './components/footer';

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

  const navigationOptions = [
    { name: 'Account', href: '/account', icon: FiUser },
    { name: 'Bookings', href: '/bookings', icon: FiBookOpen },
  ];

  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderClient
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      >
        <div className="flex items-center gap-4">
          {/* <ThemeSelector uniqueKey={'client'} /> */}
          <CartShopping />
          {user && (
            <AvatarDropdown
              bgAvatar="#5046e5"
              logout={logoutClient}
              user={user as User}
              options={navigationOptions}
            />
          )}
        </div>
      </HeaderClient>
      <div className="flex flex-1">
        <div className="container pt-10 lg:pt-8 pb-10">
          <Outlet />
        </div>
      </div>
      <Footer />
      <FooterNav />
    </div>
  );
}

export default Layout;
