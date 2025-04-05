import React, { useEffect, useState } from 'react';
import { usePublicList } from '../../hooks/usePublicList';
import { useParams } from 'react-router-dom';
import PublicListBoats from './public-list-boats';
import { Item } from '@magnetic/interfaces';
import PublicListDrinks from './public-list-drinks';
import FooterNav from '../../components/footer-menu';
import Footer from '../../components/footer';
import { HeaderClient } from '@magnetic/ui';
import CartShopping from '../../components/cart/cart-shopping';
import CartGuest from '../../components/cart/cart-guest';

interface Props {}

function PublicListPage(props: Props) {
  const {} = props;
  const params = useParams();
  const slug = params.slug || '';
  const { isLoading, isError, error, data } = usePublicList(slug);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (data?.items) {
      const items = data.items.map((item) => item.item);
      setItems(items);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }
  return (
    <div className="app flex flex-col min-h-screen">
      <HeaderClient
        toggleSidebar={() => {}}
        isSidebarVisible={false}
        links={[]}
      >
        <div className="flex items-center gap-4">
          <CartGuest />
          {/* {user && (
          <AvatarDropdown
            bgAvatar="#5046e5"
            logout={logoutClient}
            user={user as User}
            options={navigationOptions}
          />
        )} */}
        </div>
      </HeaderClient>
      <div className="flex flex-1">
        <div className="container pt-10 lg:pt-4 pb-10">
          {data?.type === 'boat_rental' && <PublicListBoats items={items} />}
          {data?.type === 'drinks' && <PublicListDrinks items={items} />}
        </div>
      </div>
      <Footer />
      <FooterNav />
    </div>
    // <div className="flex flex-1">
    //   <div className="container pt-10 lg:pt-4 pb-10">

    //   </div>
    // </div>
  );
}

export default PublicListPage;
