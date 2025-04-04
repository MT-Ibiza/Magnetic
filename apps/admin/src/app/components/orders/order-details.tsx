import { Order } from '@magnetic/interfaces';
import moment from 'moment';
import OrderItemsTable from './order-items.table';
import { CardWrapper, FormJsonDetails, Text } from '@magnetic/ui';
import { useState } from 'react';

interface Props {
  order: Order;
}

function OrderDetail(props: Props) {
  const { order } = props;
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <CardWrapper className="">
      <div className="flex items-center justify-between mb-4">
        <div className="text-base text-gray-800">
          <h1 className="font-semibold text-xl">{`Order #${order.id}`}</h1>
        </div>
        <div>
          <span
            className={`capitalize px-4 py-1 text-xs font-medium rounded-full ${
              order.status === 'success'
                ? 'bg-green-100 text-green-600'
                : order.status === 'pending'
                ? 'bg-yellow-100 text-yellow-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {order.status}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4 pb-4">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-600">
            <strong>Client:</strong> {order.user?.name} ({order.user?.email})
          </p>
          <p>
            <strong>Created:</strong>{' '}
            {moment(order.createdAt).format('DD MMM YYYY')}
          </p>
        </div>
      </div>
      <OrderItemsTable
        items={order.items}
        totalInCents={order.totalInCents}
        vatInCents={order.vatInCents}
        feeInCents={order.feeInCents}
      />
    </CardWrapper>
  );
}

export default OrderDetail;
