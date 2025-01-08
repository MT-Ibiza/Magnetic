import React from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import { Text } from '@magnetic/ui';
import OrderItemsTable from '../../components/order/order-items-table';
import OrderBookings from '../../components/services/order-bookings';
import { useMutation } from '@tanstack/react-query';
import { editFormOrder } from '../../apis/api-order';
import { OrderForm } from '@magnetic/interfaces';
import { toast } from 'sonner';

interface Props {}

function OrderPage(props: Props) {
  const {} = props;
  const params = useParams();
  const orderId = parseInt(params.id || '');

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
        <OrderBookings
          items={order.items}
          onSubmit={async (data) => {
            await editFormMutation.mutateAsync({
              form: data.form.data,
              formId: data.formId,
            });
          }}
          forms={order.forms}
        />
      </div>
    </div>
  );
}

export default OrderPage;
