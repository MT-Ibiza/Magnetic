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
import ProductsViewPage from '../pages/services/products-page';
import RedirectRoute from './redirect-route';
import NewUserPage from '../pages/new-user-page/new-user-page';
import EditUserPage from '../pages/edit-user-page/edit-user-page';
import EditServicePage from '../pages/edit-service-page/edit-service-page';
import ProvidersPage from '../pages/providers-page/providers-page';
import ServicesPage from '../pages/services-page/services-page';
import EditItemPage from '../pages/edit-item-page/edit-item-page';
import NewItemPage from '../pages/new-item-page/new-item-page';
import UserLayout from '../pages/users-page/user-layout';
import PackagesPage from '../pages/packages-page/package-page';
import NewPackagePage from '../pages/new-package-page/new-package-page';
import EditPackagePage from '../pages/edit-package-page/edit-package-page';
import ViewPackagePage from '../pages/view-package-page/view-package-page';
import ServicePage from '../pages/service-page/service-page';
import AdminUsersPage from '../pages/admin-users-page/admin-users-page';
import ProductsPage from '../pages/products/products-page';
import OrdersPage from '../pages/orders-page/orders-page';
import ViewOrderPage from '../pages/view-order-page/view-order-page';
import CategoriesPage from '../pages/categories-page/categories-page';
import AirtablePage from '../pages/airtable-page/airtable-page';
import BookingPage from '../pages/booking-page/booking-page';
import DrinksListPage from '../pages/drinks-list-page/drinks-list-page';
import NewDrinksListPage from '../pages/new-drinks-list-page/new-drinks-list-page';

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
          <Route path="services" element={<ServicesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/:id" element={<ViewOrderPage />} />
          <Route path="packages/:id" element={<ViewPackagePage />} />
          <Route path="packages/new" element={<NewPackagePage />} />
          <Route path="packages/edit/:id" element={<EditPackagePage />} />
          <Route path="services/edit/:id" element={<EditServicePage />} />
          <Route path="services/:id" element={<ServicePage />} />
          <Route path="services/new" element={<NewServicePage />} />
          <Route
            path="services/:serviceId/items/new"
            element={<NewItemPage />}
          />
          <Route
            path="services/:serviceId/items/:itemId/edit"
            element={<EditItemPage />}
          />
          <Route path="suppliers" element={<ProvidersPage />} />
          <Route path="clients" element={<UsersPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="clients/new" element={<NewUserPage />} />
          <Route path="clients/edit/:id" element={<EditUserPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="bookings/:id" element={<BookingPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="clients/:id" element={<UserLayout />}></Route>
          <Route
            path="services/:id"
            element={<Navigate replace to="overview" />}
          />
          <Route path="services/:id" element={<ServiceLayout />}>
            <Route path="products" element={<ProductsViewPage />} />
            <Route path="overview" element={<OverviewPage />} />
          </Route>
          <Route path="airtable" element={<AirtablePage />} />
          <Route path="drinks-list" element={<DrinksListPage />} />
          <Route path="drinks-list/new" element={<NewDrinksListPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
