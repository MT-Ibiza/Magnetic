import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import { Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Link } from 'react-router-dom';
import moment from 'moment';

interface Props {}

function OrdersPage(props: Props) {
  const { isLoading, isError, orders, error } = useOrders();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <Text size="2">Loading...</Text>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        {error?.message || 'Unknown error occurred'}
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex justify-center items-center h-40">
        <Text size="2">No orders available</Text>
      </div>
    );
  }

  return (
    <div className="bg-base-100 listingSection__wrap">
      <h1 className="text-center text-2xl lg:text-3xl font-semibold">My Orders</h1>
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-6 hover:shadow-md transition-shadow bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div className="mb-4 sm:mb-0 w-full sm:w-2/3">
              <Link
                to={`/orders/${order.id}`}
                className="hover:text-primary-700 hover:underline text-sm inline-block"
              >
                <Text size="2" className="font-semibold">
                  {`Order #${order.id}`}
                </Text>
              </Link>
              <Text size="1" className="text-gray-500 mt-1">
                {moment(order.createdAt).format('DD MMM YYYY')}
              </Text>
              <Text size="1" className="mt-3 text-gray-700">
                {order.description}
              </Text>
              <div className="mt-3 space-y-1">
                <Text size="1" className="text-gray-600">
                  {`Items: ${order.items.length}`}
                </Text>
                <Text size="1" className="text-gray-600">
                  {`Status: ${order.status}`}
                </Text>
              </div>
              <Link
                to={`/orders/${order.id}`}
                className="text-primary-500 hover:text-primary-700 hover:underline text-sm mt-4 inline-block"
              >
                View Order
              </Link>
            </div>
            <div className="w-full sm:w-1/3 flex justify-end">
              <Text
                size="2"
                className="font-semibold text-right text-primary-700"
              >
                {centsToEurosWithCurrency(order.totalInCents)}
              </Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
