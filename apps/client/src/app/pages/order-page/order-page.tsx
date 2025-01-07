import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { Text } from '@magnetic/ui';
import OrderItemsTable from '../../components/order/order-items-table';
import OrderBookings from '../../components/services/order-bookings';

interface Props {}

function OrderPage(props: Props) {
  const {} = props;
  const params = useParams();
  const orderId = parseInt(params.id || '');

  const { isLoading, isError, order, error } = useOrder(orderId);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  if (!order) {
    return <p>Order Not Found</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-base-100 listingSection__wrap">
        <h1>{`Order #${order.id}`}</h1>
        <OrderItemsTable items={order.items} />
      </div>
      <div className="bg-base-100 listingSection__wrap">
        <OrderBookings items={order.items} />
      </div>
    </div>
  );
}

export default OrderPage;
