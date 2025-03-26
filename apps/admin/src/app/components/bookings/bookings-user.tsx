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

  const sortedBookings = bookings?.sort((a, b) => 
    moment(b.createdAt).unix() - moment(a.createdAt).unix()
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="border-b border-neutral-200">
            <th className="text-left text-sm font-semibold text-neutral-800 py-4 px-4">
              Booking
            </th>
            <th className="text-left text-sm font-semibold text-neutral-800 py-4 px-4">
              Date
            </th>
            <th className="text-left text-sm font-semibold text-neutral-800 py-4 px-4">
              Product
            </th>
            <th className="text-left text-sm font-semibold text-neutral-800 py-4 px-4">
              Service
            </th>
            <th className="text-left text-sm font-semibold text-neutral-800 py-4 px-4">
              Order
            </th>
          </tr> 
        </thead>
        <tbody>
          {sortedBookings &&
            sortedBookings.map((booking, index) => (
              <tr
                className="border-b border-neutral-100 hover:bg-neutral-50"
                key={index}
              >
                <td className="py-4 px-4 text-sm text-neutral-700 flex items-center">
                    {getStatusIndicator(booking.status)}
                  <Link
                    className="text-primary-600 hover:underline ml-2"
                    to={`/bookings/${booking.id}`}
                  >
                    {bookingsOptions[index]?.label || `Order #${booking.id}`}
                  </Link>
                </td>
                <td className="py-4 px-4 text-sm text-neutral-700">
                  {moment(booking.createdAt).format('DD MMM YYYY')}
                </td>
                <td className="py-4 px-4 text-sm text-neutral-700">
                  <ul>
                    {booking.order.items
                      .filter((orderItem) => orderItem.type === booking.type)
                      .slice(0, 3)
                      .map((item, index) => (
                        <li key={index}>{item.item.name}</li>
                      ))}

                    {booking.order.items.filter(
                      (orderItem) => orderItem.type === booking.type
                    ).length > 3 && (
                      <li className="text-gray-500">
                        +
                        {booking.order.items.filter(
                          (orderItem) => orderItem.type === booking.type
                        ).length - 3}{' '}
                        items
                      </li>
                    )}
                  </ul>
                </td>

                <td className="py-4 px-4 text-sm text-neutral-700">
                  {booking.service.name}
                </td>
                <td className="py-4 px-4 text-sm text-neutral-700">
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

const getStatusIndicator = (status: string) => {
  let color = 'bg-gray-400';
  if (status === 'accepted' || status === 'completed') color = 'bg-green-500';
  else if (status === 'cancelled') color = 'bg-red-500';
  else if (status === 'pending' || status === 'modification_requested')
    color = 'bg-orange-500';
  return <span className={`w-3 h-3 rounded-full ${color}`} />;
};
