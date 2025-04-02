import { Button, CardWrapper, EmptyState } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { FaCartArrowDown, FaShoppingCart } from 'react-icons/fa';

export function CartPage() {
  const { isLoading, data, removeAllItemsCart, error } = useCart();
  const { cart, clearCart, addItem, getGroupedItemsByService } = useCartStore();

  const groupedCart = getGroupedItemsByService();

  const total = cart.reduce(
    (sum, item) => sum + item.item.priceInCents * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems === 0) {
    return (
      <div className='h-full flex justify-center items-center'>
`      <EmptyState
        icon={FaShoppingCart}
        title="Your cart is empty"
        description="Select services to begin"
      >
        <Link to="/services">
          <Button size={2}>View Services</Button>
        </Link>
      </EmptyState>`
      </div>
    );
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
    <div className="flex flex-col gap-[15px] lg:gap-x-[20px]">
      <div className="flex flex-col gap-4">
        <div className="bg-white dark:bg-neutral-800 p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-medium dark:text-gray-200">My Cart</h3>
            {cart.length > 0 && (
              <button
                onClick={handleRemoveAllItems}
                className="text-primary-700 underline text-lg"
              >
                Clear All
              </button>
            )}
          </div>
          <ul className="mt-4 space-y-2 max-h-[600px] overflow-y-auto">
            {Object.entries(groupedCart).length > 0 ? (
              Object.entries(groupedCart).map(([serviceId, group]: any) => (
                <div key={serviceId} className="mb-4 space-y-4">
                  <h4 className="text-md font-bold text-gray-700 dark:text-gray-100">
                    {group.service ? group.service.name : 'No Service'}
                  </h4>
                  {group.items.map((cartItem: any, index: number) => (
                    <li
                      key={index}
                      className="flex items-center gap-4 justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          className="w-16 h-16 rounded object-cover"
                          src={
                            cartItem.item.images &&
                            cartItem.item.images.length > 0
                              ? cartItem.item.images[0].url
                              : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
                          }
                          alt={cartItem.item.name}
                        />
                        <div className="flex flex-col">
                          <h4 className="text-sm dark:text-gray-100">
                            {cartItem.item.name}
                          </h4>
                          {cartItem.item.service.serviceType === 'drinks' ? (
                            <>
                              <p className="text-xs">
                                Quantity: {cartItem.quantity}
                              </p>
                              <p className="text-xs">
                                {centsToEurosWithCurrency(
                                  cartItem.item.priceInCents
                                )}{' '}
                                x unit
                              </p>
                            </>
                          ) : (
                            <p className="text-xs">
                              {centsToEurosWithCurrency(
                                cartItem.item.priceInCents
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center text-gray-500 py-6">
                <FaCartArrowDown size={10} className="mb-4" />
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
                <Link to="/checkout">
                  <Button className="py-[8px] text-[16px] w-full">
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
