'use client';

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { Fragment, useState, useEffect } from 'react';
import { FaShoppingCart, FaCartArrowDown } from 'react-icons/fa';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCartStore } from '../../hooks/useCartStore';
import { Button } from '@magnetic/ui';
import { useCart } from '../../hooks/useCart';

export function CartShopping() {
  const { isLoading, data, removeAllItemsCart } = useCart();
  const { cart, clearCart, removeItem, addItem } = useCartStore();
  console.log(cart);
  const total = cart.reduce(
    (sum, cartItem) => sum + cartItem.item.priceInCents * cartItem.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setIsBouncing(true);
      const timeout = setTimeout(() => setIsBouncing(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [totalItems]);

  useEffect(() => {
    if (data) {
      clearCart();
      data.items.map((item) => {
        addItem(item);
      });
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  async function handleRemoveAllItems() {
    await removeAllItemsCart.mutate(undefined, {
      onSuccess: () => {
        clearCart();
      },
      onError: () => {
        // showAlert('Failed to add item to the cart', 'error');
      },
    });
  }

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton className="inline-flex items-center hover:text-gray-900 transition relative">
            <FaShoppingCart size={24} />
            {totalItems > 0 && (
              <div
                className={`absolute -bottom-1 -right-2 bg-primary-700 text-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center shadow-lg ${
                  isBouncing ? 'animate-bounce' : ''
                }`}
              >
                {totalItems}
              </div>
            )}
          </PopoverButton>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="absolute z-10 w-[350px] max-w-sm px-4 mt-4 right-0 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-white dark:bg-neutral-800 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium dark:text-gray-200">
                      My Cart
                    </h3>
                    {cart.length > 0 && (
                      <button
                        onClick={handleRemoveAllItems}
                        className="text-primary-700 underline text-sm"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  <ul className="mt-4 space-y-4">
                    {cart.length > 0 ? (
                      cart.map((cartItem, index) => (
                        <li
                          key={index}
                          className="flex items-center gap-4 justify-between"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={'https://via.placeholder.com/50'}
                              alt={cartItem.item.name}
                              className="w-16 h-16 rounded object-cover"
                            />
                            <div className="flex flex-col">
                              <h4 className="text-sm dark:text-gray-100">
                                {cartItem.item.name}
                              </h4>
                              <p className="text-xs">
                                Quantity: {cartItem.quantity}
                              </p>
                              <p className="text-xs">
                                {centsToEurosWithCurrency(
                                  cartItem.item.priceInCents
                                )}{' '}
                                each
                              </p>
                            </div>
                          </div>
                          {/* <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-sm hover:underline"
                          >
                            Remove
                          </button> */}
                        </li>
                      ))
                    ) : (
                      <div className="flex flex-col items-center text-gray-500 py-6">
                        <FaCartArrowDown size={48} className="mb-4" />
                        <p className="text-sm">Your cart is empty.</p>
                      </div>
                    )}
                  </ul>
                  {cart.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between">
                        <p className="text-md font-bold">Total:</p>
                        <p className="text-md font-bold">
                          {centsToEurosWithCurrency(total)}
                        </p>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button
                          variant="outline"
                          className="py-[8px] text-[16px]"
                          onClick={() => {
                            close();
                            window.location.href = '/cart';
                          }}
                        >
                          View My Cart
                        </Button>
                        <Button
                          className="py-[8px] text-[16px]"
                          onClick={() => {
                            close();
                            window.location.href = '/checkout';
                          }}
                        >
                          Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
}

export default CartShopping;
