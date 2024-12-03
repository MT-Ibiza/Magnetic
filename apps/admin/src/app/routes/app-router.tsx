import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import PrivateRoutes from './private-routes';
import UsersPage from '../pages/user-page/user-page';
import ServicePage from '../pages/services/services-page';
import LoginPage from '../pages/login/login-page';

export const AppRouter = () => {
  const PendingPage = () => (
    <div className="text-center p-5">
      <h1>This Page is still pending</h1>
    </div>
  );
  const LayoutBlank = () => <Outlet />;

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<PendingPage />} />
          <Route path="services" element={<ServicePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="bookings" element={<PendingPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
