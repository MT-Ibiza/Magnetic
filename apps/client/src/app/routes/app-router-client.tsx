import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../layout-client';
import ServiceClientPage from '../pages/services-page/services-client-page';
import PackagePage from '../pages/packages-page/packages-page';
import RedirectRoute from './redirect-route';
import PrivateRoutes from './private-routes';
import ViewServicePage from '../pages/view-service-page/view-service-page';
import DashboardClientPage from '../pages/dashboard-page/dashboard-client';
import CheckoutPage from '../pages/checkout/checkout';
import ViewPackagePage from '../pages/view-package-page/view-package-page';
import AccountPage from '../pages/account/account';
import OrdersPage from '../pages/orders-page/orders-page';
import ViewItemPage from '../pages/view-item-page/view-item-page';
import BookingsPage from '../pages/bookings-page/bookings-page';
import PrivacyPolicyPage from '../pages/privacy-policy-page/privacy-policy-page';
import TermsConditionsPage from '../pages/terms-conditions-page/terms-conditions-page';
import PublicListPage from '../pages/public-list-page/public-list-page';
import PublicLayout from '../pages/public-list-page/public-layout';
import ListItemPage from '../pages/public-list-page/list-item-page';
import PublicCheckoutPage from '../pages/public-list-page/public-checkout-page';
import PublicBoatPage from '../pages/public-list-page/public-boat-page';

export const AppRouter = () => {
  const PendingPage = () => (
    <div className="text-center p-5">
      <h1>This Page is still pending</h1>
    </div>
  );

  const PaymentSuccess = () => (
    <div className="text-center p-5">
      <h1>Order Successful</h1>
      <h1>Thanks for your payment</h1>
    </div>
  );

  const PaymentFailed = () => (
    <div className="text-center p-5">
      <h1>Order Failed</h1>
      <h1>Please try again</h1>
    </div>
  );

  return (
    <Routes>
      <Route path="login" element={<RedirectRoute />} />
      <Route path="terms-conditions" element={<TermsConditionsPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route element={<PublicLayout />}>
        <Route
          path="boat-charters"
          element={<ViewServicePage guestMode serviceType="boats" />}
        />
        <Route path="boat-charters/:itemId" element={<PublicBoatPage />} />
        <Route path="boat-charters/checkout" element={<PublicCheckoutPage />} />
        <Route
          path="shop-drinks"
          element={<ViewServicePage guestMode serviceType="drinks" />}
        />
        <Route path="shop-drinks/checkout" element={<PublicCheckoutPage />} />
        <Route
          path="drinks-catalog"
          element={<ViewServicePage guestMode serviceType="drinks" />}
        />
        <Route
          path="drinks-catalog/checkout"
          element={<PublicCheckoutPage />}
        />
        <Route path="list/:slug" element={<PublicListPage />} />
        <Route path="list/:slug/:itemId" element={<ListItemPage />} />
        <Route path="list/:slug/checkout" element={<PublicCheckoutPage />} />
        <Route path="list/:slug/payment/success" element={<PaymentSuccess />} />
        <Route path="list/:slug/payment/failed" element={<PaymentFailed />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<DashboardClientPage />} />
          <Route path="account" element={<AccountPage />} />
          <Route path="services" element={<ServiceClientPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="checkout/success" element={<PendingPage />} />
          <Route path="checkout/failure" element={<PendingPage />} />
          <Route path="services/:id" element={<ViewServicePage />} />
          <Route
            path="services/:serviceId/item/:itemId"
            element={<ViewItemPage />}
          />
          <Route path="packages" element={<PackagePage />} />
          <Route path="packages/:id" element={<ViewPackagePage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
