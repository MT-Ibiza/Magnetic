import React from 'react';
import { useCartStore } from '../../hooks/useCartStore';
import { priceCentsToDollars } from '@magnetic/utils';
import { Button, Text } from '@magnetic/ui';

interface Props {}

function CartSummary(props: Props) {
  const {} = props;
  const { cart, total, clearCart } = useCartStore();

  return (
    <div className="mt-5 p-5 border-t" style={{ minWidth: '24rem' }}>
      <h2 className="text-xl font-bold">Cart Summary</h2>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>
            {item.name} x {item.quantity}
          </span>
          <Text.TextNumeric>
            {priceCentsToDollars(item.priceInCents * item.quantity)}
          </Text.TextNumeric>
        </div>
      ))}

      <Text.TextNumeric className="mt-3 font-bold">
        {`Total: ${priceCentsToDollars(total)}`}
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
