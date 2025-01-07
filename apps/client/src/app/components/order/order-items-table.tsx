import { OrderItem } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Text } from '@magnetic/ui';

interface Props {
  items: OrderItem[];
}

function OrderItemsTable(props: Props) {
  const { items } = props;

  return (
    <div className='custom-overflow'>
      <table className="table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr className="hover" key={index}>
              <td>{item.item.name}</td>
              <td>
                <Text.TextNumeric>
                  {centsToEurosWithCurrency(item.priceInCents)}
                </Text.TextNumeric>
              </td>
              <td>{item.quantity}</td>
              <td>
                {centsToEurosWithCurrency(item.quantity * item.priceInCents)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderItemsTable;
