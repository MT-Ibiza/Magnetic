import { HeaderApp, Sidebar, AvatarDropdown } from '@magnetic/ui';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { FaUserFriends, FaBook, FaShip } from 'react-icons/fa';
import { MdDashboardCustomize, MdWineBar } from 'react-icons/md';
import { SiAirtable, SiTask } from 'react-icons/si';
import { User } from '@magnetic/interfaces';
import { FiBookOpen, FiUser } from 'react-icons/fi';

const titles = {
  users: 'Users',
  dashboard: 'Dashboard',
  suppliers: 'Suppliers',
  services: 'Services',
  packages: 'Packages',
  bookings: 'Bookings',
};

function Layout() {
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
        {
          text: 'Orders',
          key: 'orders',
          url: '/orders',
          icon: SiTask,
        },
        {
          text: 'Bookings',
          key: 'bookings',
          url: '/bookings',
          icon: FaBook,
        },
        {
          text: 'Airtable',
          key: 'airtable',
          url: '/airtable',
          icon: SiAirtable,
        },
      ],
    },
    // {
    //   text: 'Lists',
    //   options: [
    //     {
    //       text: 'Drink List',
    //       key: 'drinks',
    //       url: '/list/drinks',
    //       icon: MdWineBar,
    //     },
    //     {
    //       text: 'Boat List',
    //       key: 'boats',
    //       url: '/list/boats',
    //       icon: FaShip,
    //     },
    //   ],
    // },
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
          text: 'Suppliers',
          url: '/suppliers',
          icon: FaUserFriends,
        },
        {
          text: 'Admin Users',
          url: '/users',
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
          text: 'Products',
          url: '/products',
          icon: SiTask,
        },
        {
          text: 'Packages',
          url: '/packages',
          icon: SiTask,
        },
        {
          text: 'Categories',
          url: '/categories',
          icon: SiTask,
        },
      ],
    },
  ];

  const navigationOptions = [
    { name: 'Account', href: '/users', icon: FiUser },
    { name: 'Booking', href: '/bookings', icon: FiBookOpen },
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
          {user && (
            <AvatarDropdown
              showInformation={true}
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
          headerClassName="py-3 lg:py-2"
          isVisible={isSidebarVisible}
          toggleSidebar={toggleSidebar}
        />
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
