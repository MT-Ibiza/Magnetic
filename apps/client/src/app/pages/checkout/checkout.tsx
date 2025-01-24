import { Button, CardWrapper, FormJsonDetails, Text } from '@magnetic/ui';
import { useCartStore } from '../../hooks/useCartStore';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '../../apis/api-order';
import { Link, useNavigate } from 'react-router-dom';
import { Order } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useEffect, useState } from 'react';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';
import { useCart } from '../../hooks/useCart';
import { toast } from 'sonner';

interface FormOrderData {
  data: any;
  serviceId: number;
  serviceType: string;
  serviceName: string;
  itemId?: number;
}
export function CheckoutPage() {
  const { cart, addItem, removeItem, clearCart, getGroupedItemsByService } =
    useCartStore();
  const { isLoading, data, removeAllItemsCart } = useCart();
  const groupedCart = getGroupedItemsByService();

  const [currentTab, setCurrentTab] = useState(0);
  const [createdOrderId, setCreatedOrderId] = useState<number>();
  const [forms, setForms] = useState<FormOrderData[]>([]);
  const [formsCheckout, setFormsCheckout] = useState<
    {
      formIndex: number;
      form: FormOrderData;
      completed: boolean;
    }[]
  >([]);

  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder(forms),
    onSuccess: (order: Order) => {
      clearCart();
      setCreatedOrderId(order.id);
      //@ts-ignore
      document.getElementById('order_success_modal').showModal();
      // toast.success('Order Created!');
      // navigate(`/orders/${order.id}`);
      // refetch();
    },
  });

  const paymentMethods = [
    { gateway: 'Stripe' },
    { gateway: 'Bank Transfer' },
    { gateway: 'Paypal' },
  ];

  async function handleCreateOrder() {
    const allRequiredFormsCompleted = formsCheckout.every(
      (formCheckout) => formCheckout.completed
    );
    if (allRequiredFormsCompleted) {
      await createOrderMutation.mutateAsync();
    } else {
      toast.error('Please complete all required forms before proceeding.');
    }
  }

  const total = cart.reduce(
    (sum, cartItem) => sum + cartItem.item.priceInCents * cartItem.quantity,
    0
  );

  useEffect(() => {
    if (data) {
      clearCart();
      data.items.map((item) => {
        return addItem({
          id: item.item.id,
          item: item.item,
          quantity: item.quantity,
        });
      });

      const allServices = data.items.map((orderItem) => {
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
      setFormsCheckout(
        forms.map((form, index) => {
          return {
            formIndex: 0,
            form: form,
            completed: false,
          };
        })
      );
    }
  }, [data]);

  return (
    <div>
      <div className={`nc-CheckOutPagePageMain`}>
        <main className="container mt-11 flex flex-col gap-[15px] lg:grid lg:grid-cols-12 lg:gap-x-[20px]">
          <div className="col-span-8 w-full ">
            <div className="bg-base-100 w-full flex flex-col rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 p-6 xl:p-8">
              <h2 className="text-lg lg:text-2xl font-semibold">
                Confirm and payment
              </h2>
              <div className="">
                <Text>Some servicies require fill some forms</Text>
              </div>
              <div role="tablist" className="tabs tabs-lifted mt-8">
                {formsCheckout.map((formCheckout, index) => {
                  const { form } = formCheckout;
                  return (
                    <>
                      <input
                        type="radio"
                        name="my_tabs_2"
                        role="tab"
                        className={`tab`}
                        aria-label={`${form.serviceName}`}
                        checked={index === currentTab}
                        onChange={() => {
                          setCurrentTab(index);
                        }}
                      />
                      <div
                        role="tabpanel"
                        className="tab-content bg-base-100 border-base-300 rounded-box p-6"
                      >
                        <div className="p-3 my-3">
                          {formCheckout.completed ? (
                            <div className="flex flex-col gap-3 ">
                              <FormJsonDetails formData={form.data} />
                              <Button
                                className="w-[10rem]"
                                onClick={() => {
                                  const formsFilled = formsCheckout.map((f) => {
                                    return f.form.serviceId === form.serviceId
                                      ? { ...f, ...{ completed: false } }
                                      : f;
                                  });
                                  setFormsCheckout(formsFilled);
                                }}
                              >
                                Edit Again
                              </Button>
                            </div>
                          ) : (
                            <>
                              <RenderBookingForm
                                type={form.serviceType}
                                formData={form.data}
                                onSubmit={(data) => {
                                  form.data = data;
                                  setForms(forms);
                                  formCheckout.completed = true;
                                  const formsFilled = formsCheckout.map((f) => {
                                    return f.form.serviceId === form.serviceId
                                      ? { ...f, ...{ completed: true } }
                                      : f;
                                  });
                                  setFormsCheckout(formsFilled);
                                }}
                              />
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="sticky top-[60px] w-full flex flex-col gap-3">
              <CardWrapper className="flex flex-col space-y-4">
                <h3 className="text-2xl font-semibold mb-3">Summary order</h3>
                <ul className="space-y-4 w-full">
                  {Object.entries(groupedCart).length > 0 ? (
                    Object.entries(groupedCart).map(
                      ([serviceId, group]: any) => (
                        <div key={serviceId} className="mb-4 space-y-4">
                          <h4 className="text-md font-bold text-gray-700 dark:text-gray-100">
                            {group.service ? group.service.name : 'No Service'}
                          </h4>
                          {group.items.map((cartItem: any, index: number) => (
                            <li
                              key={index}
                              className="grid grid-cols-8 items-center gap-2 w-full"
                            >
                              <img
                                className="col-span-1 w-10 h-10 rounded object-cover"
                                src={
                                  cartItem.item.images &&
                                  cartItem.item.images.length > 0
                                    ? cartItem.item.images[0].url
                                    : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
                                }
                                alt={cartItem.item.name}
                              />
                              <div className="col-span-6">
                                <div className="flex flex-col w-full">
                                  <Text
                                    size="1"
                                    className="font-semibold line-clamp-2"
                                  >
                                    {cartItem.item.name}
                                  </Text>
                                  <Text size="1" className="text-sm">
                                    {`Quantity: ${cartItem.quantity}`}
                                  </Text>
                                </div>
                              </div>
                              <div className="col-span-1 flex justify-end w-full">
                                <Text size="1" className="text-sm">
                                  {centsToEurosWithCurrency(
                                    cartItem.item.priceInCents *
                                      cartItem.quantity
                                  )}
                                </Text>
                              </div>
                            </li>
                          ))}
                        </div>
                      )
                    )
                  ) : (
                    <Text>No items in cart</Text>
                  )}
                </ul>

                <div className="border-b border-neutral-200 dark:border-neutral-700 my-2"></div>
                <div className="flex justify-between mt-3">
                  <h1>Total</h1>
                  <Text.TextNumeric>
                    {centsToEurosWithCurrency(total)}
                  </Text.TextNumeric>
                </div>
              </CardWrapper>
              <CardWrapper>
                <Text>Payment Methods</Text>
                <div className="join join-vertical w-full my-5">
                  {paymentMethods.map((method, index) => {
                    return (
                      <div
                        className="collapse collapse-arrow join-item border-base-300 border"
                        key={index}
                      >
                        <input type="radio" name="my-accordion-4" />
                        <Text className="collapse-title">{method.gateway}</Text>
                        <div className="collapse-content">
                          <Text size="1">Pending integration</Text>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <Button
                  className="w-full"
                  onClick={handleCreateOrder}
                  disabled={formsCheckout.some((form) => !form.completed)}
                >
                  Create Order
                </Button>
              </CardWrapper>
            </div>
          </div>
        </main>
      </div>
      <dialog id="order_success_modal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Order Created</h3>
          <p className="py-4">We have send an email with all details</p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-3">
                <Link to={`/services`}>
                  <Button className="" variant="outline" color="neutral">
                    Check other services
                  </Button>
                </Link>
                <Link to={`/orders/${createdOrderId}`}>
                  <Button className="">View Order</Button>
                </Link>
              </div>
            </form>
          </div> 
        </div>
      </dialog>
    </div>
  );
}

export default CheckoutPage;
