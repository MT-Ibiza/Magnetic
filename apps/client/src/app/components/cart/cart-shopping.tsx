'use client';

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react';
import { Fragment } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCartStore } from '../../hooks/useCartStore';

export function CartShopping() {
  const { cart, total, clearCart } = useCartStore();

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton className="inline-flex items-center text-gray-600 hover:text-gray-900 transition">
            <FaShoppingCart size={20} />
            <span className="ml-2 text-sm">{cart.length}</span>
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
            <PopoverPanel className="absolute z-10 w-screen max-w-sm px-4 mt-4 right-0 sm:px-0">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="bg-white dark:bg-neutral-800 p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-200">
                    My Cart
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {cart.length > 0 ? (
                      cart.map((item, index) => (
                        <li key={index} className="flex items-center gap-4">
                          <img
                            src={'https://via.placeholder.com/50'}
                            alt={item.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex flex-col">
                            <h4 className="text-sm text-gray-900 dark:text-gray-100">
                              {item.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              Quantity: {item.quantity}
                            </p>
                            <p className="text-xs text-gray-500">
                              {centsToEurosWithCurrency(item.priceInCents)} each
                            </p>
                          </div>
                        </li>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Your cart is empty.
                      </p>
                    )}
                  </ul>
                  <div className="mt-4 space-y-2">
                    <p className="text-sm font-bold">
                      Total: {centsToEurosWithCurrency(total)}
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={clearCart}
                        className="w-full bg-red-500 text-white py-2 rounded text-sm"
                      >
                        Clear Cart
                      </button>
                      <button className="w-full bg-gray-700 text-white py-2 rounded text-sm">
                        Checkout
                      </button>
                    </div>
                  </div>
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
