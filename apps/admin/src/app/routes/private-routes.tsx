import { Outlet, Navigate } from 'react-router-dom';
// import { useAuth } from '../hooks/useAuth';

const PrivateRoutes = () => {
  // const { getCurrentUser } = useAuth();
  // const user = getCurrentUser();
  const user  = true //TODO: Remove after integrate auth
  return !!user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
