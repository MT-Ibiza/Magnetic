import { Outlet } from 'react-router-dom'

interface Props {}

function Layout(props: Props) {
  const {} = props

  return (
    <div className='app'>
      <h1>Magnetic</h1>
      <Outlet />
    </div>
  )
}

export default Layout
