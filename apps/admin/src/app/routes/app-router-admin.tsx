import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../layout';
import PrivateRoutes from './private-routes';
import UsersPage from '../pages/users-page/users-page';
import DashboardPage from '../pages/dashboard-page/dashboard';
import BookingsPage from '../pages/bookings-page/bookings-page';
import SettingsPage from '../pages/settings-page/settings-page';
import NewServicePage from '../pages/new-service-page/new-service-page';
import ServiceLayout from '../pages/services/services-layout';
import OverviewPage from '../pages/services/overview-page';
import ProductsPage from '../pages/services/products-page';
import RedirectRoute from './redirect-route';
import NewUserPage from '../pages/new-user-page/new-user-page';
import EditUserPage from '../pages/edit-user-page/edit-user-page';
import EditServicePage from '../pages/edit-service-page/edit-service-page';
import ViewServicePage from '../pages/view-service-page/view-service-page';
import ProvidersPage from '../pages/providers-page/providers-page';
import ServicePage from '../pages/services-page/services-page';

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
          <Route path="services" element={<ServicePage />} />
          <Route path="services/edit/:id" element={<EditServicePage />} />
          <Route path="services/:id" element={<ViewServicePage />} />
          <Route path="services/new" element={<NewServicePage />} />
          <Route path="providers" element={<ProvidersPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="users/new" element={<NewUserPage />} />
          <Route path="users/edit/:id" element={<EditUserPage />} />
          <Route path="bookings" element={<BookingsPage />} />
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
