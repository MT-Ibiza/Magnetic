import React, { useState } from 'react';
import { Item } from '@magnetic/interfaces';
import { Alert, Button, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { Link } from 'react-router-dom';

interface Props {
  item: Item;
}

function ItemBoatCard(props: Props) {
  const { item } = props;
  const { addServiceToCart } = useCart();
  const { addItem, removeItem, cart } = useCartStore();
  const productCart = cart.find((cartItem) => cartItem.item.id === item.id);
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning';
  } | null>(null);

  const showAlert = (
    message: string,
    type: 'success' | 'error' | 'warning'
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAddItem = (quantity: number) => {
    const newVal = quantity + 1;
    addServiceToCart.mutate(
      { itemId: item.id, quantity: newVal },
      {
        onSuccess: () => {
          addItem({
            id: item.id,
            item: item,
            quantity: newVal,
          });
          showAlert('Product added to the cart', 'success');
        },
        onError: () => {
          showAlert('Failed to add product to the cart', 'error');
        },
      }
    );
  };

  const handleRemoveItem = (quantity: number) => {
    const newVal = quantity - 1;
    addServiceToCart.mutate(
      { itemId: item.id, quantity: newVal },
      {
        onSuccess: () => {
          removeItem(item.id);
          showAlert('Item removed to the cart', 'success');
        },
        onError: () => {
          showAlert('Failed to remove item to the cart', 'error');
        },
      }
    );
  };
  return (
    <>
      <div className="border rounded-xl border-neutral-200 p-4 space-y-4 shadow-sm hover:border-primary-700 transition-shadow">
        <div className="flex gap-5">
          <img
            className="object-cover rounded-lg h-[125px] w-[125px]"
            src={
              item.images && item.images.length > 0
                ? item.images[0].url
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
            }
            alt={item.name}
          />
          <div className="flex flex-col w-full">
            <div className="w-full pb-2 flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-primary">
                  {item.name}
                </h2>
                <Text size="1">{`Max Pax: ${
                  item.boatAttributes?.capacity || '-'
                }`}</Text>
              </div>
              <div className="flex flex-col gap-3 items-end">
                <h2 className="text-lg font-semibold text-secondary">
                  {centsToEurosWithCurrency(item.priceInCents)}
                </h2>
                <div className="flex gap-5">
                  {productCart?.quantity === 1 ? (
                    <Button
                      onClick={() => {
                        handleRemoveItem(productCart?.quantity || 0);
                      }}
                    >
                      - Remove Cart
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        handleAddItem(productCart?.quantity || 0);
                      }}
                    >
                      + Add Cart
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <Text className="line-clamp-4">{item.description}</Text>
          </div>
        </div>
      </div>
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </>
  );
}

export default ItemBoatCard;
