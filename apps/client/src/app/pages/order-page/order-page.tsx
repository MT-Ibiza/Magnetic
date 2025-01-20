import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { CardWrapper, Text } from '@magnetic/ui';
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
  const [currentTab, setCurrentTab] = useState(0);

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
      <CardWrapper className="bg-base-100">
        <h1>{`Order #${order.id}`}</h1>
        <OrderItemsTable
          items={order.items}
          totalInCents={order.totalInCents}
        />
      </CardWrapper>
      <CardWrapper className="bg-base-100 ">
        <h1>Booking Forms</h1>
        <Text className="text-gray-500 mt-1" size="1">
          Please fill this forms they are required to give a better service
        </Text>
        <div role="tablist" className="tabs tabs-lifted mt-8">
          {forms.map((form) => (
            <div key={form.id}>
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label={`${form.service.name}`}
                defaultChecked={form.id === forms[currentTab]?.id}
                onClick={() => {
                  setCurrentTab(forms.findIndex((f) => f.id === form.id)); 
                }}
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <div className="p-5 my-3">
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
            </div>
          ))}
        </div>
      </CardWrapper>
    </div>
  );
}

export default OrderPage;
