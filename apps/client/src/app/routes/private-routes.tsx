import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useCallback, useEffect, useState } from 'react';
import { getCurrentClient } from '../apis/api-client';
import { User } from '@magnetic/interfaces';

const PrivateRoutes = () => {
  const [user, setUser] = useState<User>();
  const { getCurrentUser, setCurrentUser } = useAuth();
  const userStore = getCurrentUser();

  const fetchCurrentUser = useCallback(async () => {
    const user = await getCurrentClient();
    setCurrentUser({
      name: `${user.name}`,
      email: user.email,
      arrivalDate: user.arrivalDate,
      accommodation: user.accommodation,
      package: user.package,
      phone: user.phone,
      //@ts-ignore
      id: user.id,
    });
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  if (userStore) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoutes;
