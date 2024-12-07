import React from 'react';
import { useCartStore } from '../../hooks/useCartStore';
import { priceCentsToDollars } from '@magnetic/utils';
import { Text } from '@magnetic/ui';

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
          <Text.TextNumeric
            text={priceCentsToDollars(item.priceInCents * item.quantity)}
          />
        </div>
      ))}
      <Text.TextNumeric
        className="mt-3 font-bold"
        text={`Total: ${priceCentsToDollars(total)}`}
      />
      <button
        onClick={clearCart}
        className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
      >
        Vaciar Carrito
      </button>
    </div>
  );
}

export default CartSummary;
