import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useOrder } from '../../hooks/useOrder';
import {
  CardWrapper,
  FormJsonDetails,
  RenderBookingForm,
  Text,
} from '@magnetic/ui';
import OrderItemsTable from '../../components/order/order-items-table';
import { useMutation } from '@tanstack/react-query';
import { editFormOrder } from '../../apis/api-order';
import { OrderForm } from '@magnetic/interfaces';
import { toast } from 'sonner';
import { API_URL } from '../../apis/api-constants';

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
      toast.error(`Cannot submit form!`);
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
    return <p>{error?.message || 'Unknown error'} </p>;
  }

  if (!order) {
    return <p>Order Not Found</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      <CardWrapper className="bg-base-100">
        <h4 className="text-lg font-semibold mb-3">{`Order #${order.id}`}</h4>
        <OrderItemsTable
          items={order.items}
          totalInCents={order.totalInCents}
        />
      </CardWrapper>
      <CardWrapper className="bg-base-100 ">
        <h1>Booking Forms</h1>
        <Text className="text-gray-500 mt-1" size="1">
          Please fill these forms as they are required to give better service
        </Text>
        <div role="tablist" className="tabs tabs-lifted mt-8">
          {forms.map((form, index) => (
            <>
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                className="tab"
                aria-label={`${form.service.name}`}
                checked={index === currentTab}
                onClick={() => setCurrentTab(index)}
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-0 lg:p-6"
              >
                <div className="p-5 my-3">
                  {form.formData && Object.keys(form.formData).length > 0 ? (
                    <FormJsonDetails formData={form.formData} serviceType="" />
                  ) : (
                    <RenderBookingForm
                      apiUrl={API_URL}
                      type={form.service.serviceType}
                      formData={form.formData}
                      onSubmit={async (data) => {
                        await editFormMutation.mutateAsync({
                          form: data,
                          formId: form.id,
                        });
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          ))}
        </div>
      </CardWrapper>
    </div>
  );
}

export default OrderPage;
