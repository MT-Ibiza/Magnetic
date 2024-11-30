import { HeaderApp, Sidebar } from '@magnetic/ui'
import { Outlet } from 'react-router-dom'

interface Props {}

function Layout(props: Props) {
  const {} = props
  const navigation = [
    {
      text: 'Dashboard',
      key: 'dashboard',
      url: '/dashboard',
      links: [],
      icon: 'dashboard',
    },
    {
      text: 'Users',
      key: 'users',
      url: '/users',
      links: [],
      icon: 'user-group',
    },
    {
      text: 'Bookings',
      key: 'bookings',
      url: '/bookings',
      links: [],
      icon: 'book',
    },
    {
      text: 'Settings',
      key: 'settings',
      url: '/',
      links: [],
      icon: 'cog',
    },
  ];
  return (
    <div className='app'>
      <HeaderApp/>
      <Sidebar options={navigation}/>
      <Outlet />
    </div>
  )
}

export default Layout
