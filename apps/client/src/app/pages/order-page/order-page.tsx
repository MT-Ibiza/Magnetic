import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';

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

  return <div className="s">{order.id}</div>;
}

export default OrderPage;
