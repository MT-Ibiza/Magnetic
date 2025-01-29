import { Link } from 'react-router-dom';
import moment from 'moment';
import { Text } from '@magnetic/ui';
import { BookingForm } from '@magnetic/interfaces';

interface Props {
  bookings: BookingForm[];
}

export function BookingsUser(props: Props) {
  const { bookings } = props;

  const bookingsOptions =
    bookings?.map((booking) => {
      return {
        label: `Booking #${booking.id}`,
        value: booking.id,
      };
    }) || [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left text-sm font-semibold text-neutral-800 py-2 px-4">Booking</th>
            <th className="text-left text-sm font-semibold text-neutral-800 py-2 px-4">Service</th>
            <th className="text-left text-sm font-semibold text-neutral-800 py-2 px-4">Order</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((booking, index) => (
              <tr className="border-b border-neutral-100 hover:bg-neutral-50" key={index}>
                <td className="py-2 px-4 text-sm text-neutral-700">
                  <Link
                    className="text-primary-600 hover:underline"
                    to={`/orders/${booking.order.id}`}
                  >
                    {bookingsOptions[index]?.label || `Order #${booking.id}`}
                  </Link>
                  <Text size="1" className="text-neutral-500 text-xs">
                    {moment(booking.createdAt).format('DD MMM YYYY')}
                  </Text>
                </td>
                <td className="py-2 px-4 text-sm text-neutral-700">{booking.service.name}</td>
                <td className="py-2 px-4 text-sm text-neutral-700">
                  <Link
                    className="hover:text-primary-600 hover:underline"
                    to={`/orders/${booking.order.id}`}
                  >
                    {`#${booking.order.id}`}
                  </Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
