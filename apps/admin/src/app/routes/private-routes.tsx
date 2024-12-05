import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../pages/login-page/login-page';

const PrivateRoutes = () => {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  if (user) {
    return <Outlet />
  }else{
    return <LoginPage />
  }
};

export default PrivateRoutes;
