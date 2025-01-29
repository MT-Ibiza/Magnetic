import { Link } from 'react-router-dom';
import moment from 'moment';
import { Text } from '@magnetic/ui';
import { useBookings } from '../../hooks/userBookings';

interface Props {}

export function BookingsTable(props: Props) {
  const {} = props;
  const { isLoading, bookings, bookingsOptions, error, isError, refetch } =
    useBookings();

  return (
    <div className="">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Booking</th>
            <th>Service</th>
            <th>Client</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((booking, index) => (
              <tr className="hover" key={index}>
                <td>
                  <Link
                    className="hover:text-primary-500 hover:underline"
                    to={`/orders/${booking.order.id}`}
                  >
                    {bookingsOptions[index]?.label || `Order #${booking.id}`}
                  </Link>
                  <Text size="1" className="text-gray-500">
                    {moment(booking.createdAt).format('DD MMM YYYY')}
                  </Text>
                </td>
                <td>{booking.service.name}</td>
                <td>{booking.order.user.name}</td>
                <td>
                  <Link
                    className="hover:text-primary-500 hover:underline"
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
