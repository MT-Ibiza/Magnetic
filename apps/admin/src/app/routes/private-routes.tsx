import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoginPage from '../pages/login-page/login-page';

const PrivateRoutes = () => {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  return user ? <Navigate to="/dashboard" /> : <LoginPage />;
};

export default PrivateRoutes;
