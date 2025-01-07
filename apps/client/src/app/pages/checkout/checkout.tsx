import { Button, Text } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../../apis/api-order';
import { useNavigate } from 'react-router-dom';
import { Order } from '@magnetic/interfaces';

export function CheckoutPage() {
  const { cart, addItem, removeItem, clearCart } = useCartStore();
  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder(),
    onSuccess: (order: Order) => {
      debugger;
      clearCart();
      navigate(`/orders/${order.id}`);
      // refetch();
    },
  });

  const paymentMethods = [
    { gateway: 'Stripe' },
    { gateway: 'Bank Transfer' },
    { gateway: 'Paypal' },
  ];

  async function handleCreateOrder() {
    await createOrderMutation.mutateAsync();
  }

  return (
    <div className={`nc-CheckOutPagePageMain`}>
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">
          <div className="bg-base-100 w-full flex flex-col rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 xl:p-8">
            <h2 className="text-lg lg:text-2xl font-semibold">
              Confirm and payment
            </h2>
            <div className="border-b border-neutral-200 dark:border-neutral-700">
              <Text>
                Some servicies need fill a form, you can review/fill them after
                pay
              </Text>
            </div>
            <div>
              <Text>Payment Methods</Text>

              <div className="join join-vertical w-full my-5">
                {paymentMethods.map((method, index) => {
                  return (
                    <div
                      className="collapse collapse-arrow join-item border-base-300 border"
                      key={index}
                    >
                      <input type="radio" name="my-accordion-4" />
                      <div className="collapse-title text-xl font-medium">
                        {method.gateway}
                      </div>
                      <div className="collapse-content">
                        <Text size="1">Pending integration</Text>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button onClick={handleCreateOrder}>Create Order</Button>
            </div>
          </div>
        </div>
        <div className=" hidden lg:block flex-grow">
          <div className="bg-base-100 w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold">Price detail</h3>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>$19</span>
                <span>$57</span>
              </div>
              <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
                <span>Service charge</span>
                <span>$0</span>
              </div>

              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>$57</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;
