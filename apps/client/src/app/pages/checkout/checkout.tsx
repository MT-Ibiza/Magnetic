import { Button, EmptyState, Text } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import ProductsSummary from './products-summary';
import CheckoutSummary from './checkout-summary';
import CheckoutPayment from './checkout-payment';

export function CheckoutPage() {
  const { cart } = useCartStore();
  const { isLoading, data } = useCart();

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      {cart.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Search in our services and start to planning your trip"
        >
          <Link to={`/services`}>
            <Button>View Services</Button>
          </Link>
        </EmptyState>
      ) : (
        <main className="mt-4 lg:mt-11 flex flex-col gap-[15px] lg:grid lg:grid-cols-12 lg:gap-x-[20px]">
          <div className="col-span-8 w-full ">
            <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
              <h2 className="text-3xl lg:text-4xl font-semibold">
                Confirm and payment
              </h2>
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <Text className="text-gray-500 mt-2">
                Please ensure all details, especially the dates, are accurate to
                prevent any inconveniences
              </Text>
              <div className="mt-8">
                <ProductsSummary />
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="sticky top-[90px] w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
              <CheckoutSummary />
              <CheckoutPayment />
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default CheckoutPage;
