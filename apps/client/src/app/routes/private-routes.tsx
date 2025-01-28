import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();
  console.log(user);
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoutes;
