import { HeaderApp, Sidebar, AvatarDropdown } from '@magnetic/ui';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { FaUserFriends, FaBook, FaCog } from 'react-icons/fa';
import { MdDashboardCustomize } from 'react-icons/md';
import { SiTask } from 'react-icons/si';

interface Props {}

function Layout(props: Props) {
  const { logout, getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const [isSidebarVisible, setSidebarVisible] = useState(true);

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

  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderApp
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      >
        {user && <AvatarDropdown logout={logout} user={user} />}
      </HeaderApp>
      <div className="flex flex-1">
        <Sidebar
          options={navigation}
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
        <div
          className={`flex-1 p-4 transition-all duration-300 ${
            isSidebarVisible ? 'ml-[20rem]' : 'ml-0'
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
