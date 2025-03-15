import { Button } from '@headlessui/react';
import { Text } from '@magnetic/ui';
import React from 'react';
import { GoTrash } from 'react-icons/go';
import { useCart } from '../../hooks/useCart';
import { CartItem, Item } from '@magnetic/interfaces';
import { useCartStore } from '../../hooks/useCartStore';

interface Props {
  cartItem: CartItem;
}

function CheckoutItemRemove(props: Props) {
  const { cartItem } = props;
  const { item } = cartItem;
  const { removeItemCart } = useCart();
  const { removeItem } = useCartStore();

  const handleRemoveItem = () => {
    removeItemCart.mutate(cartItem.id, {
      onSuccess: () => {
        removeItem(cartItem.id);
        // showAlert('Item removed to the cart', 'success');
      },
      onError: () => {
        // showAlert('Failed to remove item to the cart', 'error');
      },
    });
  };

  return (
    <div className="flex gap-3 text-gray-500 bg-gray-50 p-1 hover:text-red-500">
      <Button className="flex gap-1 items-center" onClick={handleRemoveItem}>
        <GoTrash size={14} />
      </Button>
    </div>
  );
}

export default CheckoutItemRemove;
