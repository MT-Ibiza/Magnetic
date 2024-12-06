import {
  HeaderApp,
  Sidebar,
  AvatarDropdown,
  ThemeSelector,
} from '@magnetic/ui';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { FaUserFriends } from 'react-icons/fa';
import { SiTask } from 'react-icons/si';

interface Props {}

function Layout(props: Props) {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const navigation = [
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
  ];

  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderApp
        toggleSidebar={toggleSidebar}
        isSidebarVisible={isSidebarVisible}
      >
        <div className="flex items-center gap-3">
          <ThemeSelector uniqueKey={'client'} />
          {/* {user && <AvatarDropdown logout={logout} user={user as User} />} */}
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
