import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../layout-client';
import ServiceClientPage from '../pages/services-page/services-client-page';
import PackagePage from '../pages/packages-page/packages-page';
import RedirectRoute from './redirect-route';
import LoginPage from '../pages/login-page/login-page';
import PrivateRoutes from './private-routes';

export const AppRouter = () => {
  const PendingPage = () => (
    <div className="text-center p-5">
      <h1>This Page is still pending</h1>
    </div>
  );
  const LayoutBlank = () => <Outlet />;

  return (
    <Routes>
      <Route path="login" element={<RedirectRoute />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path="services" element={<ServiceClientPage />} />
          <Route path="packages" element={<PackagePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
