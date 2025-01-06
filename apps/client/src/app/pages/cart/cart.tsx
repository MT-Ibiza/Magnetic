import { Button, CardWrapper, EmptyState } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export function CartPage() {
  const { cart, addItem, removeItem } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.priceInCents * item.quantity,
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

  return (
    <div className="grid grid-cols-12 gap-x-[20px]">
      <CardWrapper className="col-span-9 p-4">
        <div className="flex flex-col gap-4">
          <p className="text-2xl font-semibold">My Cart</p>
          <div className="grid grid-cols-4 gap-4 text-center font-semibold border-b pb-2 mb-4 text-sm">
            <span className="text-left">Item</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>
          {cart.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 items-center border-b py-2 text-sm"
            >
              <div className="flex items-center justify-start">
                <div className="w-20 h-20">
                  <img
                    className="w-full h-full object-cover"
                    src={'https://via.placeholder.com/100'}
                    alt={item.name}
                  />
                </div>
                <div className="ml-3 ">{item.name}</div>
              </div>
              <div className="text-center">
                {centsToEurosWithCurrency(item.priceInCents)}
              </div>
              <div className="flex justify-center items-center gap-2">
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-300"
                  onClick={() => removeItem(item.id)}
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
                  onClick={() => addItem(item)}
                >
                  <FiPlus size={16} color="#6b7280" />
                </button>
              </div>
              <div className=" text-center">
                {centsToEurosWithCurrency(item.priceInCents * item.quantity)}
              </div>
            </div>
          ))}
        </div>
      </CardWrapper>
      <div className="col-span-3 hidden lg:block flex-grow lg:mt-0">
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
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>Service charge</span>
                <span>$0</span>
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
