import { useCartStore } from '../../hooks/useCartStore';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Button, Text } from '@magnetic/ui';
import { useGuestCartStore } from '../../hooks/useGuestCartStore';

interface Props {
  guestMode?: boolean;
}

function CartSummary(props: Props) {
  const { guestMode } = props;
  const { cart, total, clearCart } = guestMode
    ? useGuestCartStore()
    : useCartStore();

  return (
    <div className="mt-5 p-5 border-t" style={{ minWidth: '24rem' }}>
      <h2 className="text-xl font-bold">Cart Summary</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>
            {item.item.name} x {item.quantity}
          </span>
          <Text.TextNumeric>
            {centsToEurosWithCurrency(item.item.priceInCents * item.quantity)}
          </Text.TextNumeric>
        </div>
      ))}

      <Text.TextNumeric className="mt-3 font-bold">
        {`Total: ${centsToEurosWithCurrency(total)}`}
      </Text.TextNumeric>
      <div className="flex gap-5">
        <button
          onClick={clearCart}
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
        >
          Remove All Items
        </button>
        <Button onClick={clearCart}>Add Items Cart</Button>
      </div>
    </div>
  );
}

export default CartSummary;
