import React from 'react';
import { useOrders } from '../../hooks/useOrders';

interface Props {}

function OrdersPage(props: Props) {
  const { isLoading, isError, orders, error } = useOrders();

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  if (orders.length === 0) {
    return <p>No Orders</p>;
  }

  return <div className="s">Pending</div>;
}

export default OrdersPage;
