import { Outlet, useLocation, useParams } from 'react-router-dom';
import FooterNav from '../../components/footer-menu';
import Footer from '../../components/footer';
import { HeaderClient } from '@magnetic/ui';
import CartShopping from '../../components/cart/cart-shopping';

function PublicLayout() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/');
  const section = pathSegments[1];

  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderClient
        toggleSidebar={() => {}}
        isSidebarVisible={false}
        links={[]}
        mainLink={`/${section}`}
      >
        <div className="flex items-center gap-4">
          <CartShopping guestMode />
        </div>
      </HeaderClient>
      <div className="flex flex-1">
        <div className="container pt-10 lg:pt-4 pb-10">
          <Outlet />
        </div>
      </div>
      <Footer />
      <FooterNav />
    </div>
  );
}

export default PublicLayout;
