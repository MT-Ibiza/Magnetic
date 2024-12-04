import { HeaderApp, Sidebar } from '@magnetic/ui';
import { Outlet } from 'react-router-dom';

interface Props {}

function Layout(props: Props) {
  const {} = props;
  const navigation = [
    {
      text: 'Dashboard',
      key: 'dashboard',
      url: '/dashboard',
      icon: 'dashboard',
    },
    {
      text: 'Services',
      key: 'services',
      url: '/services',
      icon: 'user-group',
    },
    {
      text: 'Users',
      key: 'users',
      url: '/users',
      icon: 'user-group',
    },
    {
      text: 'Bookings',
      key: 'bookings',
      url: '/bookings',
      icon: 'book',
    },
    {
      text: 'Settings',
      key: 'settings',
      url: '/settings',
      icon: 'cog',
    },
  ];
  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderApp />
      <div className="flex flex-1">
        <Sidebar options={navigation} />
        <div className="flex-1 ml-[20rem] p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
