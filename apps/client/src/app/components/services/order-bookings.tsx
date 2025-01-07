import { OrderItem } from '@magnetic/interfaces';

interface Props {
  items: OrderItem[];
}

function OrderBookings(props: Props) {
  const { items } = props;

  const allServicesIds = items.map((orderItem) => {
    return orderItem.item.service.serviceType;
  });
  const servicesType = [...new Set(allServicesIds)];
  console.log(servicesType);
  return (
    <div className="s">
      <div></div>
    </div>
  );
}

export default OrderBookings;
