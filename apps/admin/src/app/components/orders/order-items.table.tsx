import { OrderItem } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Text } from '@magnetic/ui';

interface Props {
  items: OrderItem[];
  totalInCents: number;
  vatInCents: number;
}

function OrderItemsTable(props: Props) {
  const { items, totalInCents, vatInCents } = props;

  return (
    <div className="">
      <table className="table">
        <thead>
          <tr>
            <th>Product/Service</th>
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
                    className="w-16 h-16 object-cover rounded-md"
                    src={
                      item.item.images && item.item.images.length > 0
                        ? item.item.images[0].url
                        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
                    }
                    alt={item.item.name}
                  />
                  <div className="flex flex-col gap-1">
                    <Text>{item.item.name}</Text>
                    <Text className="text-gray-500" size="1">
                      {item.item.service?.name}
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
              <h1>Subtotal</h1>
            </td>
            <td>
              <Text.TextNumeric>
                {centsToEurosWithCurrency(totalInCents)}
              </Text.TextNumeric>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <h1>V.A.T</h1>
            </td>
            <td>
              <Text.TextNumeric>
                {centsToEurosWithCurrency(vatInCents)}
              </Text.TextNumeric>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td>
              <h1>TOTAL</h1>
            </td>
            <td>
              <Text.TextNumeric>
                {centsToEurosWithCurrency(totalInCents + vatInCents)}
              </Text.TextNumeric>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderItemsTable;
