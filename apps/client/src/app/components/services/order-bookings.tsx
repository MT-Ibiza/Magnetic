import { CartItem, OrderForm, OrderItem } from '@magnetic/interfaces';
import RenderBookingForm from './booking-forms/render-booking-form';
import { Text } from '@magnetic/ui';

interface Props {
  items: OrderItem[] | CartItem[];
  onSubmit: (form: { data: any; serviceId: number }) => void;
  forms?: OrderForm[];
}

function OrderBookings(props: Props) {
  const { items, onSubmit, forms = [] } = props;
  console.log('OrderBookings: ', forms);
  const allServices = items.map((orderItem) => {
    return orderItem.item.service;
  });

  const servicesType = allServices.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );

  return (
    <div className="s">
      <h1>Complete this forms</h1>
      {/* <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 1"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 1
        </div>
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 2"
          checked
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 2
        </div>
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Tab 3"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 3
        </div>
      </div> */}
      <div className="mt-5">
        {servicesType.map((service, index) => (
          <div key={index}>
            <h1>{service.name}</h1>
            <div className="border border-md p-5 my-3">
              <RenderBookingForm
                type={service.serviceType}
                formData={
                  forms.find((form) => form.serviceId === service.id)?.formData
                }
                onSubmit={(data) => {
                  onSubmit({ data, serviceId: service.id });
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderBookings;
