import { Outlet } from 'react-router-dom';
import Nav from './Nav'

const Layout = () => {
  return (
    <div className="app-layout">        
        <Outlet />
        <Nav />
    </div>
  )
}

export default Layout