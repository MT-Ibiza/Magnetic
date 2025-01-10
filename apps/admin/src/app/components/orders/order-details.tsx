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
              order.status === 'Completed'
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
      <OrderItemsTable items={order.items} totalInCents={order.totalInCents} />
      <h1>Booking Forms</h1>
      <div role="tablist" className="tabs tabs-lifted mt-8">
        {order.forms.map((form, index) => (
          <>
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label={`${form.service.name}`}
              checked={index === currentTab}
              onChange={() => {
                setCurrentTab(index);
              }}
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            >
              <div className="p-5 my-3">
                <FormJsonDetails formData={form.formData} />
              </div>
            </div>
          </>
        ))}
      </div>
      {/* <div className="space-y-4">
        {order.items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
          >
            <img
              src={'https://via.placeholder.com/50'}
              alt={item.item.name}
              className="w-16 h-16 object-cover rounded-md"
            />
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-800 line-clamp-2">
                {item.item.name}
              </p>
              <p className="text-sm text-gray-500">{item.item.service.name}</p>
              <div className="mt-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <p>
                    <strong>Price:</strong>{' '}
                    {centsToEurosWithCurrency(item.priceInCents)}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.quantity}
                  </p>
                </div>
                <div className="flex justify-between mt-1 font-semibold text-gray-800">
                  <p>Subtotal:</p>
                  <p>
                    {centsToEurosWithCurrency(
                      item.quantity * item.priceInCents
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-right font-bold text-lg text-gray-900 mt-4">
        <h2 className="font-bold">
          <strong>Total Order:</strong>{' '}
          {centsToEurosWithCurrency(order.totalInCents)}
        </h2>
      </div> */}
    </CardWrapper>
  );
}

export default OrderDetail;
