import { Button, CardWrapper, EmptyState, Text } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import ProductsSummary from './products-summary';
import CheckoutSummary from './checkout-summary';
import CheckoutPayment from './checkout-payment';

export function CheckoutPage() {
  const { cart, addItem, clearCart } = useCartStore();
  const { isLoading, data } = useCart();

  useEffect(() => {
    if (data) {
      clearCart();
      data.items.map((item) => {
        return addItem({
          id: item.item.id,
          item: item.item,
          quantity: item.quantity,
          formData: item.formData,
        });
      });
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <>
      {cart.length === 0 ? (
        <EmptyState
          title="Your cart is empty"
          icon="camera"
          description="Search in our services and start to planning your trip"
        >
          <Link to={`/services`}>
            <Button>View Services</Button>
          </Link>
        </EmptyState>
      ) : (
        <main className="container mt-11 flex flex-col gap-[15px] lg:grid lg:grid-cols-12 lg:gap-x-[20px]">
          <div className="col-span-8 w-full ">
            <CardWrapper>
              <h2 className="text-lg lg:text-2xl font-semibold">
                Confirm and payment
              </h2>
              <Text className="text-gray-500 mt-2">
                Please ensure all details, especially the dates, are accurate to
                prevent any inconveniences
              </Text>
              <div className="mt-8">
                <ProductsSummary />
              </div>
            </CardWrapper>
          </div>
          <div className="col-span-4">
            <div className="sticky top-[60px] w-full flex flex-col gap-3">
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
