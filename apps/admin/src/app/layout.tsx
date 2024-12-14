import { HeaderApp, Sidebar, AvatarDropdown, Text } from '@magnetic/ui';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { FaUserFriends, FaBook, FaCog } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import { SiTask } from 'react-icons/si';
import { User } from '@magnetic/interfaces';
import { FiBookOpen, FiUser } from 'react-icons/fi';
import ThemeSelector from './components/theme-selector';

interface Props {}

function Layout(props: Props) {
  const { logout, getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

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
          text: 'Users',
          key: 'users',
          url: '/users',
          icon: FaUserFriends,
        },
        {
          text: 'Providers',
          url: '/providers',
          icon: FaUserFriends,
        },
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

  const navigation = [
    {
      text: 'Dashboard',
      key: 'dashboard',
      url: '/dashboard',
      icon: MdDashboardCustomize,
    },
    {
      text: 'Packages',
      key: 'packages',
      url: '/packages',
      icon: SiTask,
    },
    {
      text: 'Services',
      key: 'services',
      url: '/services',
      icon: SiTask,
    },
    {
      text: 'Providers',
      key: 'providers',
      url: '/providers',
      icon: FaUserFriends,
    },
    {
      text: 'Users',
      key: 'users',
      url: '/users',
      icon: FaUserFriends,
    },
    {
      text: 'Bookings',
      key: 'bookings',
      url: '/bookings',
      icon: FaBook,
    },
    {
      text: 'Settings',
      key: 'settings',
      url: '/settings',
      icon: FaCog,
    },
  ];

  const navigationOptions = [
    { name: 'Account', href: '/', icon: FiUser },
    { name: 'Booking', href: '/', icon: FiBookOpen },
  ];

  return (
    <div className="app flex flex-col min-h-screen bg-base-100">
      <HeaderApp
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      >
        <div className="flex items-center gap-3">
          {user && (
            <AvatarDropdown
              logout={logout}
              user={user as User}
              options={navigationOptions}
            />
          )}
        </div>
      </HeaderApp>
      <div className="flex flex-1">
        <Sidebar
          options={navigationGroup}
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        >
          <div className="absolute bottom-0 p-4  w-full">
            <div className="bg-base-100 flex justify-between px-6 py-3 rounded-md">
              <Text size="1">Dark Mode</Text>
              <ThemeSelector />
            </div>
          </div>
        </Sidebar>
        <div
          className={`flex-1 p-4 transition-all duration-300 mt-5 ${
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
