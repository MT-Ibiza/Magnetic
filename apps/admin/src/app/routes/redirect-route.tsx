import { Navigate } from 'react-router-dom';
import LoginPage from '../pages/login-page/login-page';
import { useAuth } from '../hooks/useAuth';

const RedirectRoute = () => {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  return user ? <Navigate to="/dashboard" /> : <LoginPage />;
};

export default RedirectRoute;
