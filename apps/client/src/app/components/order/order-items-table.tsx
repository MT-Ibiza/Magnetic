import React from 'react';
import { OrderItem } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Text } from '@magnetic/ui';
import { placeholderItem } from '../../constants';

interface Props {
  items: OrderItem[];
  totalInCents: number;
}

function OrderItemsTable(props: Props) {
  const { items, totalInCents } = props;

  const groupedItems = items.reduce((acc, item) => {
    const serviceId = item.item.service.id;
    if (!acc[serviceId]) {
      acc[serviceId] = [];
    }
    acc[serviceId].push(item);
    return acc;
  }, {} as Record<number, OrderItem[]>);

  return (
    <div>
      <table className="table w-full border-collapse">
        <thead>
          <tr>
            <th>Product/Service</th>
            <th className="text-center">Price</th>
            <th className="text-center">Quantity</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(groupedItems).map(([serviceId, serviceItems]) => (
            <React.Fragment key={serviceId}>
              <tr>
                <td colSpan={4} className="py-4">
                  <h2 className="text-lg font-bold">
                    {serviceItems[0].item.service.name}
                  </h2>
                </td>
              </tr>
              {serviceItems.map((item, index) => (
                <tr className="hover" key={index}>
                  <td>
                    <div className="flex gap-3 items-center">
                      <img
                        className="w-16 h-16 object-cover rounded-md"
                        src={
                          item.item.images && item.item.images.length > 0
                            ? item.item.images[0].url
                            : placeholderItem
                        }
                        alt={item.item.name}
                      />
                      <div className="flex flex-col gap-1">
                        <Text>{item.item.name}</Text>
                      </div>
                    </div>
                  </td>
                  <td className="text-center">
                    <Text.TextNumeric>
                      {centsToEurosWithCurrency(item.priceInCents)}
                    </Text.TextNumeric>
                  </td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-center">
                    <Text.TextNumeric>
                      {centsToEurosWithCurrency(
                        item.quantity * item.priceInCents
                      )}
                    </Text.TextNumeric>
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
          <tr>
            <td colSpan={2}></td>
            <td className="text-right font-bold">TOTAL:</td>
            <td className="text-center font-bold">
              <Text.TextNumeric>
                {centsToEurosWithCurrency(totalInCents)}
              </Text.TextNumeric>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderItemsTable;
