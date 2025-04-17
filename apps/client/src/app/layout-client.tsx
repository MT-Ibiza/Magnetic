import { HeaderClient, AvatarDropdown } from '@magnetic/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { User } from 'libs/interfaces/src/lib/users';
import { FiBookOpen, FiUser } from 'react-icons/fi';
import CartShopping from './components/cart/cart-shopping';
import FooterNav from './components/footer-menu';
import Footer from './components/footer';

function Layout() {
  const { logoutClient, getCurrentUser } = useAuth();
  const user = getCurrentUser();
  const location = useLocation();
  const { pathname } = location;
  const [isSidebarVisible, setSidebarVisible] = useState(
    window.innerWidth >= 1024
  );

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
        <div className="container pt-10 lg:pt-4 pb-10">
          <Outlet />
        </div>
      </div>
      <Footer />
      <FooterNav />
    </div>
  );
}

export default Layout;
