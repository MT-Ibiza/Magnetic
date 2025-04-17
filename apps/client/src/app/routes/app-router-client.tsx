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
import {
  SLUG_PUBLIC_BOATS,
  SLUG_PUBLIC_ORDER_DRINKS,
  SLUG_PUBLIC_SHOP_DRINKS,
} from '../constants';
import PaymentPage from '../pages/payment-page/payment-page';

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

  const slugBoats = SLUG_PUBLIC_BOATS;
  const slugShopDrinks = SLUG_PUBLIC_SHOP_DRINKS;
  const slugOrderDrinks = SLUG_PUBLIC_ORDER_DRINKS;

  return (
    <Routes>
      <Route path="login" element={<RedirectRoute />} />
      <Route path="terms-conditions" element={<TermsConditionsPage />} />
      <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
      <Route element={<PublicLayout />}>
        <Route
          path={`${slugBoats}`}
          element={<ViewServicePage guestMode serviceType="boats" />}
        />
        <Route path={`${slugBoats}/:itemId`} element={<PublicBoatPage />} />
        <Route
          path={`${slugBoats}/checkout`}
          element={<PublicCheckoutPage />}
        />
        <Route
          path={`${slugShopDrinks}`}
          element={<ViewServicePage guestMode serviceType="drinks" />}
        />
        <Route
          path={`${slugShopDrinks}/checkout`}
          element={<PublicCheckoutPage />}
        />
        <Route
          path={`${slugShopDrinks}/payment/success`}
          element={<PaymentSuccess />}
        />
        <Route
          path={`${slugShopDrinks}/payment/failed`}
          element={<PaymentFailed />}
        />
        <Route
          path={`${slugOrderDrinks}`}
          element={<ViewServicePage guestMode serviceType="drinks" />}
        />
        <Route
          path={`${slugOrderDrinks}/checkout`}
          element={<PublicCheckoutPage />}
        />
        <Route path={`${slugBoats}/payment`} element={<PaymentPage />} />
        <Route path={`${slugShopDrinks}/payment`} element={<PaymentPage />} />
        {/* <Route path="list/:slug" element={<PublicListPage />} />
        <Route path="list/:slug/:itemId" element={<ListItemPage />} />
        <Route path="list/:slug/checkout" element={<PublicCheckoutPage />} />
        <Route path="list/:slug/payment/success" element={<PaymentSuccess />} />
        <Route path="list/:slug/payment/failed" element={<PaymentFailed />} /> */}
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
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
          <Route path="payment" element={<PaymentPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
