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
import PaymentButton from '../../components/payment-button';
import ProductsSummary from './products-summary';
import CheckoutSummary from './checkout-summary';
import CheckoutPayment from './checkout-payment';

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
  const [createdOrderId, setCreatedOrderId] = useState<number>();
  const navigate = useNavigate();

  const createOrderMutation = useMutation({
    mutationFn: () => createOrder([]),
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

      // setForms(forms);
      // setFormsCheckout(
      //   forms.map((form, index) => {
      //     return {
      //       formIndex: 0,
      //       form: form,
      //       completed: false,
      //     };
      //   })
      // );
    }
  }, [data]);

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  return (
    <div>
      <div className={`nc-CheckOutPagePageMain`}>
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
              <CheckoutPayment total={1000} orderId={123123} />
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
