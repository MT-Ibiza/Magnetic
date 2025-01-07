import {
  HeaderApp,
  Sidebar,
  AvatarDropdown,
  Text,
  ThemeSelector,
} from '@magnetic/ui';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { FaUserFriends, FaBook, FaCog } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import { SiTask } from 'react-icons/si';
import { User } from '@magnetic/interfaces';
import { FiBookOpen, FiUser } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

interface Props {}

const titles = {
  users: 'Users',
  dashboard: 'Dashboard',
  providers: 'Providers',
  services: 'Services',
  packages: 'Packages',
  bookings: 'Bookings',
};

function Layout(props: Props) {
  const { logout, getCurrentUser } = useAuth();
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

  const navigationGroup = [
    {
      text: 'Dashboard',
      options: [
        {
          text: 'Dashboard',
          url: '/dashboard',
          icon: MdDashboardCustomize,
        },
      ],
    },
    {
      text: 'Users',
      options: [
        {
          text: 'Clients',
          key: 'users',
          url: '/clients',
          icon: FaUserFriends,
        },
        {
          text: 'Providers',
          url: '/providers',
          icon: FaUserFriends,
        },
        {
          text: 'Admin Users',
          url: '/users',
          icon: FaUserFriends,
        },
        // {
        //   text: 'Admin',
        //   key: 'users',
        //   url: '/users',
        //   icon: FaUserFriends,
        // },
      ],
    },
    {
      text: 'Services & Products',
      options: [
        {
          text: 'Services',
          url: '/services',
          icon: SiTask,
        },
        {
          text: 'All Products',
          url: '/products',
          icon: SiTask,
        },
        {
          text: 'Packages',
          url: '/packages',
          icon: SiTask,
        },
      ],
    },
    {
      text: 'Bookings',
      options: [
        {
          text: 'Bookings',
          key: 'bookings',
          url: '/bookings',
          icon: FaBook,
        },
        // {
        //   text: 'Settings',
        //   key: 'settings',
        //   url: '/settings',
        //   icon: FaCog,
        // },
      ],
    },
  ];

  const navigationOptions = [
    { name: 'Account', href: '/', icon: FiUser },
    { name: 'Booking', href: '/', icon: FiBookOpen },
  ];

  function getPageTitle() {
    const route = pathname.split('/')[1];
    return titles[route as 'users'];
  }

  return (
    <div className="app flex flex-col min-h-screen bg-base-200">
      <HeaderApp
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
        pageTitle={getPageTitle()}
      >
        <div className="flex items-center gap-3">
          <ThemeSelector className="lg:hidden" uniqueKey={'client'} />
          {user && (
            <AvatarDropdown
              logout={logout}
              user={user as User}
              options={navigationOptions}
            />
          )}
        </div>
      </HeaderApp>
      <div className="lg:flex lg:flex-1">
        <Sidebar
          options={navigationGroup}
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        >
          <div className="hidden lg:absolute bottom-0 p-4  w-full">
            <div className="bg-base-200 flex justify-between px-6 py-3 rounded-md">
              <Text size="1">Dark Mode</Text>
              <ThemeSelector uniqueKey={'admin'} />
            </div>
          </div>
        </Sidebar>
        <div
          className={`p-6 flex-1 transition-all duration-300 ${
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
