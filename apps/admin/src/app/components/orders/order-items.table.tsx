import { OrderItem } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Text } from '@magnetic/ui';

interface Props {
  items: OrderItem[];
  totalInCents: number;
}

function OrderItemsTable(props: Props) {
  const { items, totalInCents } = props;

  return (
    <div className="custom-overflow">
      <table className="table">
        <thead>
          <tr>
            <th>Item/Service</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr className="hover" key={index}>
              <td>
                <div className="flex gap-3">
                  <img
                    src={'https://via.placeholder.com/50'}
                    alt={item.item.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />

                  <div className="flex flex-col gap-1">
                    <Text>{item.item.name}</Text>
                    <Text className="text-gray-500" size="1">
                      {item.item.service.name}
                    </Text>
                  </div>
                </div>
              </td>
              <td>
                <Text.TextNumeric>
                  {centsToEurosWithCurrency(item.priceInCents)}
                </Text.TextNumeric>
              </td>
              <td>x {item.quantity}</td>
              <td>
                <Text.TextNumeric>
                  {centsToEurosWithCurrency(item.quantity * item.priceInCents)}
                </Text.TextNumeric>
              </td>
            </tr>
          ))}
          <tr>
            <td></td>
            <td></td>
            <td>
              <h1>TOTAL</h1>
            </td>
            <td>
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
