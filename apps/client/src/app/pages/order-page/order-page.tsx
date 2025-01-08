import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { Text } from '@magnetic/ui';
import OrderItemsTable from '../../components/order/order-items-table';
import OrderBookings from '../../components/services/order-bookings';
import { useMutation } from '@tanstack/react-query';
import { editFormOrder } from '../../apis/api-order';
import { OrderForm } from '@magnetic/interfaces';
import { toast } from 'sonner';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';

interface Props {}

function OrderPage(props: Props) {
  const {} = props;
  const params = useParams();
  const orderId = parseInt(params.id || '');
  const [forms, setForms] = useState<OrderForm[]>([]);

  const { isLoading, isError, order, error } = useOrder(orderId);

  const editFormMutation = useMutation<
    OrderForm,
    Error,
    { form: any; formId?: number }
  >({
    mutationFn: (data) => {
      return editFormOrder({ id: data.formId || 0, formData: data.form });
    },
    onSuccess: () => {
      toast.success(`Form submitted!`);
    },
    onError: () => {
      toast.error(`Cannot submitted form!`);
    },
  });

  useEffect(() => {
    if (order?.forms.length) {
      setForms(order.forms);
      console.log(order.forms);
    }
  }, [order]);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{error?.message || 'unknown error'} </p>;
  }

  if (!order) {
    return <p>Order Not Found</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-base-100 listingSection__wrap">
        <h1>{`Order #${order.id}`}</h1>
        <OrderItemsTable items={order.items} />
      </div>
      <div className="bg-base-100 listingSection__wrap">
        {forms.map((form, index) => (
          <div key={index}>
            <h1>{form.service.name}</h1>
            <div className="border border-md p-5 my-3">
              <RenderBookingForm
                type={form.service.serviceType}
                formData={form.formData}
                onSubmit={async (data) => {
                  await editFormMutation.mutateAsync({
                    form: data,
                    formId: form.id,
                  });
                }}
              />
            </div>
          </div>
        ))}
        {/* <OrderBookings
          items={order.items}
          onSubmit={async (data) => {
            await editFormMutation.mutateAsync({
              form: data.form.data,
              formId: data.formId,
            });
          }}
          forms={order.forms}
        /> */}
      </div>
    </div>
  );
}

export default OrderPage;
