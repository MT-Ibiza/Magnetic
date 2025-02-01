import { Button } from '@headlessui/react';
import { Text } from '@magnetic/ui';
import React from 'react';
import { GoTrash } from 'react-icons/go';
import { useCart } from '../../hooks/useCart';
import { Item } from '@magnetic/interfaces';
import { useCartStore } from '../../hooks/useCartStore';

interface Props {
  item: Item;
}

function CheckoutItemRemove(props: Props) {
  const { item } = props;
  const { addItemToCart } = useCart();
  const { removeItem } = useCartStore();

  const handleRemoveItem = () => {
    addItemToCart.mutate(
      { itemId: item.id, quantity: 0 },
      {
        onSuccess: () => {
          removeItem(item.id);
          // showAlert('Item removed to the cart', 'success');
        },
        onError: () => {
          // showAlert('Failed to remove item to the cart', 'error');
        },
      }
    );
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
