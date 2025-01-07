import { OrderItem } from '@magnetic/interfaces';
import RenderBookingForm from './booking-forms/render-booking-form';

interface Props {
  items: OrderItem[];
}

function OrderBookings(props: Props) {
  const { items } = props;
  const allServices = items.map((orderItem) => {
    return orderItem.item.service;
  });
  const servicesType = allServices.filter(
    (item, index, self) => index === self.findIndex((t) => t.id === item.id)
  );
  return (
    <div className="s">
      <h1>Please Fill this forms</h1>
      <div>
        {servicesType.map((service, index) => (
          <div key={index}>
            <div>
              {service.name} / {service.serviceType}
            </div>
            <div className="border border-md p-5 my-3">
              <RenderBookingForm type={service.serviceType} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderBookings;
