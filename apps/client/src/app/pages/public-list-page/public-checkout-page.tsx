import { Button, EmptyState, Text } from '@magnetic/ui';
import { Link } from 'react-router-dom';
import { getTotalByService } from '@magnetic/utils';
import { useGuestCartStore } from '../../hooks/useGuestCartStore';
import CheckoutSummary from '../checkout/checkout-summary';
import ProductsSummary from '../checkout/products-summary';
import CheckoutPayment from '../checkout/checkout-payment';
import { useGuestCartActions } from '../../hooks/useGuestCartActions';

export function PublicCheckoutPage() {
  const { cart } = useGuestCartStore();
  const { isLoading, data } = useGuestCartActions();
  const servicesSummary = getTotalByService(cart);
  const total = servicesSummary.reduce(
    (sum, service) => sum + service.total,
    0
  );

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      {cart.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          description="Browse services to start planning your trip."
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
                Confirm & Pay
              </h2>
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <Text className="text-gray-500 mt-2">
                Ensure all details, especially dates and timings, are correct to
                avoid any inconveniences
              </Text>
              <div className="mt-8">
                <ProductsSummary guestMode />
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="sticky top-[90px] w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
              <CheckoutSummary
                servicesSummary={servicesSummary}
                total={total}
              />
              <CheckoutPayment
                servicesSummary={servicesSummary}
                total={total}
              />
            </div>
          </div>
        </main>
      )}
    </>
  );
}

export default PublicCheckoutPage;
