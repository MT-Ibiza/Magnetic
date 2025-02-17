import { Button, CardWrapper, EmptyState } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export function CartPage() {
  const { addServiceToCart } = useCart();
  const { cart, addItem, removeItem, getGroupedItemsByService } =
    useCartStore();
  const groupedCart = getGroupedItemsByService();

  const total = cart.reduce(
    (sum, item) => sum + item.item.priceInCents * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems === 0) {
    return (
      <EmptyState title="Your cart is empty" description="Check our services">
        <Link to="/services">
          <Button>View Services</Button>
        </Link>
      </EmptyState>
    );
  }

  const handleAddItem = (item: any, quantity: number) => {
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
        },
        onError: () => {},
      }
    );
  };

  const handleRemoveItem = (item: any, quantity: number) => {
    const newVal = quantity - 1;
    if (newVal >= 0) {
      addServiceToCart.mutate(
        { itemId: item.id, quantity: newVal },
        {
          onSuccess: () => {
            removeItem(item.id);
          },
          onError: () => {},
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-[15px] lg:grid lg:grid-cols-12 lg:gap-x-[20px]">
      <CardWrapper className="col-span-9 p-4">
        <div className="flex flex-col gap-4">
          <p className="text-center lg:text-start text-2xl font-semibold pb-[15px] lg:pb-[0px]">
            My Cart
          </p>
          {Object.entries(groupedCart).map(([serviceId, group]: any) => (
            <div key={serviceId} className="border-b pb-4 mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {group.service.name}
              </h3>
              <div className="hidden lg:grid grid-cols-4 gap-4 text-center font-semibold border-b pb-2 mb-4 text-sm">
                <span className="text-left">Item</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Subtotal</span>
              </div>
              {group.items.map((item: any, index: number) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-4 items-center last:border-b-0 border-b py-2 text-sm"
                >
                  <div className="flex items-center justify-start">
                    <div className="w-5 h-5 lg:w-20 lg:h-20">
                      <img
                        className="w-[20px] h-[20px] rounded-[8px] lg:w-full lg:h-full object-cover"
                        src={
                          item.item.images && item.item.images.length > 0
                            ? item.item.images[0].url
                            : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
                        }
                        alt={item.item.name}
                      />
                    </div>
                    <div className="ml-3">{item.item.name}</div>
                  </div>
                  <div className="text-center">
                    {centsToEurosWithCurrency(item.item.priceInCents)}
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300"
                      onClick={() => handleRemoveItem(item, item.quantity)}
                    >
                      <FiMinus size={16} color="#6b7280" />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="bg-base-100 w-10 h-6 text-center text-sm outline-none border border-gray-300 rounded-sm"
                      readOnly
                    />
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300"
                      onClick={() => handleAddItem(item, item.quantity)}
                    >
                      <FiPlus size={16} color="#6b7280" />
                    </button>
                  </div>
                  <div className="text-center">
                    {centsToEurosWithCurrency(
                      item.item.priceInCents * item.quantity
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardWrapper>
      <div className="col-span-3 lg:block flex-grow lg:mt-0">
        <div className="sticky top-16">
          <div className="bg-base-100 listingSectionSidebar__wrap shadow-xl">
            <div className="flex justify-between">
              <span className="text-xl font-semibold">Order summary</span>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>{totalItems} items</span>
                <span>{centsToEurosWithCurrency(total)}</span>
              </div>
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{centsToEurosWithCurrency(total)}</span>
              </div>
            </div>
            <Button href={'/checkout'}>Checkout</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
