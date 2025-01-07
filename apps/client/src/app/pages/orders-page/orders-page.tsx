import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import { Text } from '@magnetic/ui';
import { centsToEuros, centsToEurosWithCurrency } from '@magnetic/utils';
import { Link } from 'react-router-dom';

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

  return (
    <div className="bg-base-100 listingSection__wrap">
      <Text>My Orders</Text>
      <div className="flex flex-col gap-3">
        {orders.map((order, index) => (
          <div
            className="border border-md p-5 flex justify-between"
            key={index}
          >
            <div>
              <Text size="2">{`Order #${order.id}`}</Text>
              <Text
                size="1"
                className="text-gray-500"
              >{`${order.createdAt}`}</Text>
              {/* <Text>{`Items: ${order.items.length}`}</Text> */}
              <Text size="1">
                <Link to={`/orders/${order.id}`}>View Order</Link>
              </Text>
              {/* <Text size="1" className="text-gray-500 mt-2">
                * Please complete forms
              </Text> */}
            </div>
            <div>
              <Text>{`${centsToEurosWithCurrency(order.totalInCents)}`}</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
