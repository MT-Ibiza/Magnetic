import { HeaderApp } from '@magnetic/ui'
import { Outlet } from 'react-router-dom'

interface Props {}

function Layout(props: Props) {
  const {} = props

  return (
    <div className='app'>
      <HeaderApp/>
      <Outlet />
    </div>
  )
}

export default Layout
