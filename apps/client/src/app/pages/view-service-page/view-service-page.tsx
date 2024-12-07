import { CardWrapper, Text } from '@magnetic/ui';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useService } from '../../hooks/useService';
import { Item } from '@magnetic/interfaces';
import ItemCardCounter from '../../components/items/item-card-counter';
import { useCartStore } from '../../hooks/useCartStore';
import CartSummary from '../../components/cart/cart-summary';

interface Props {}

function ViewServicePage(props: Props) {
  const {} = props;
  const params = useParams();
  const serviceId = parseInt(params.id || '');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>();
  const { isLoading, isError, service, error } = useService(serviceId);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  if (!service) {
    return <p>Service Not Found</p>;
  }

  return (
    <CardWrapper>
      <div>
        <h1>{service.name}</h1>
        <span>{service.package.name}</span>
        <div
          className="editor-text"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
        <Text className="my-4">Choose your favorites</Text>
        <div className="flex gap-5">
          <div className="flex flex-wrap gap-3 flex-4">
            {service.items.map((item, index) => (
              <ItemCardCounter key={index} item={item} />
            ))}
          </div>
          <div className="flex-2">
            <CartSummary />
          </div>
        </div>
      </div>
    </CardWrapper>
  );
}

export default ViewServicePage;
