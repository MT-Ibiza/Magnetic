import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../layout-client';
import ServiceClientPage from '../pages/services-page/services-client-page';
import PackagePage from '../pages/packages-page/packages-page';
import RedirectRoute from './redirect-route';
import PrivateRoutes from './private-routes';
import ViewServicePage from '../pages/view-service-page/view-service-page';
import DashboardClientPage from '../pages/dashboard-page/dashboard-client';
import CartPage from '../pages/cart/cart';
import CheckoutPage from '../pages/checkout/checkout';
import ViewPackagePage from '../pages/view-package-page/view-package-page';
import AccountPage from '../pages/account/account';
import OrderPage from '../pages/order-page/order-page';

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
          <Route path="dashboard" element={<DashboardClientPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="services" element={<ServiceClientPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="services/:id" element={<ViewServicePage />} />
          <Route path="packages" element={<PackagePage />} />
          <Route path="packages/:id" element={<ViewPackagePage />} />
          <Route path="orders/:id" element={<OrderPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
