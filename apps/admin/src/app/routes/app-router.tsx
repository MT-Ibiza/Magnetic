import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import PrivateRoutes from './private-routes';
import UsersPage from '../pages/users-page/users-page';
import ServicePage from '../pages/services-page/services-page';
import DashboardPage from '../pages/dashboard-page/dashboard';
import BookingsPage from '../pages/bookings-page/bookings-page';
import SettingsPage from '../pages/settings-page/settings-page';
import NewServiceForm from '../pages/new-service-page/new-service-page';
import ServiceLayout from '../pages/services/services-layout';
import OverviewPage from '../pages/services/overview-page';
import ProductsPage from '../pages/services/products-page';
import RedirectRoute from './redirect-route';

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
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="all-services" element={<ServicePage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="services/new" element={<NewServiceForm />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route
            path="services/:id"
            element={<Navigate replace to="overview" />}
          />
          <Route path="services/:id" element={<ServiceLayout />}>
            <Route path="products" element={<ProductsPage />} />
            <Route path="overview" element={<OverviewPage />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
