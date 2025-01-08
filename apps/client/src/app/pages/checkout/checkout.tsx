import { Button, Text } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../../apis/api-order';
import { useNavigate } from 'react-router-dom';
import { Order } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useEffect, useState } from 'react';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';

export function CheckoutPage() {
  const { cart, addItem, removeItem, clearCart } = useCartStore();
  const [forms, setForms] = useState<
    {
      data: any;
      serviceId: number;
      serviceType: string;
      serviceName: string;
      itemId?: number;
    }[]
  >([]);
  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder(forms),
    onSuccess: (order: Order) => {
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

  const total = cart.reduce(
    (sum, cartItem) => sum + cartItem.item.priceInCents * cartItem.quantity,
    0
  );

  useEffect(() => {
    if (cart.length) {
      const allServices = cart.map((orderItem) => {
        return orderItem.item.service;
      });

      const servicesNeedForm = allServices.filter(
        (item, index, self) => index === self.findIndex((t) => t.id === item.id)
      );

      const forms = servicesNeedForm.map((service) => {
        return {
          data: {},
          serviceId: service.id,
          serviceType: service.serviceType,
          serviceName: service.name,
          itemId: undefined,
        };
      });
      setForms(forms);
    }
  }, [cart]);

  return (
    <div className={`nc-CheckOutPagePageMain`}>
      <main className="container mt-11 flex flex-col gap-[15px] lg:grid lg:grid-cols-12 lg:gap-x-[20px]">
        <div className="col-span-8 w-full ">
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
            {forms.map((form, index) => (
              <div key={index}>
                <h1>{form.serviceName}</h1>
                <div className="border border-md p-5 my-3">
                  <RenderBookingForm
                    type={form.serviceType}
                    formData={form.data}
                    onSubmit={(data) => {
                      form.data = data;
                      setForms(forms);
                    }}
                  />
                </div>
              </div>
            ))}
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
        <div className="col-span-4">
          <div className="sticky top-[60px] bg-base-100 w-full flex flex-col rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 p-6 xl:p-8">
            <div className="flex flex-col space-y-4">
              <h3 className="text-2xl font-semibold">Price detail</h3>
              <ul className="space-y-4 w-full">
                {cart.map((cartItem, index) => (
                  <li
                    key={index}
                    className="grid grid-cols-8 items-center gap-4 w-full"
                  >
                    <img
                      src={'https://via.placeholder.com/50'}
                      alt={cartItem.item.name}
                      className="col-span-2 w-16 h-16 rounded object-cover"
                    />
                    <div className="col-span-6 grid grid-cols-5 gap-4 items-center">
                      <div className="col-span-4 flex flex-col">
                        <Text size="1" className="font-semibold line-clamp-2">
                          {cartItem.item.name}
                        </Text>
                        <Text size="1" className="text-sm">
                          {`Quantity: ${cartItem.quantity}`}
                        </Text>
                      </div>
                      <div className="col-span-1 flex justify-end w-full">
                        <Text size="1" className="text-sm">
                          {centsToEurosWithCurrency(
                            cartItem.item.priceInCents * cartItem.quantity
                          )}
                        </Text>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
              <div className="flex justify-between font-semibold">
                <span className="font-semibold">Total</span>
                <span>{`€${(total / 100).toFixed(2)}`}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckoutPage;
