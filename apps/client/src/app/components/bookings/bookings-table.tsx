import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Text } from '@magnetic/ui';
import { useBookings } from '../../hooks/userBookings';

interface Props {}

export function BookingsTable(props: Props) {
  const {} = props;
  const { isLoading, bookings, bookingsOptions, error, isError, refetch } =
    useBookings();

  return (
    <div className="overflow-x-auto">
      <table className="table w-full min-w-[600px]">
        <thead>
          <tr>
            <th>Date</th>
            <th>Service</th>
            <th>Booking</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((booking, index) => (
              <tr className="hover" key={index}>
                <td>
                  <Text size="1" className="text-gray-500">
                    {moment(booking.createdAt).format('DD MMM YYYY')}
                  </Text>
                </td>
                <td>{booking.service.name}</td>
                <td>
                  <Link
                    className="hover:text-primary-500 hover:underline"
                    to={`/orders/${booking.order.id}`}
                  >
                    {`#${booking.id}`}
                  </Link>
                </td>
                <td>{booking.order.status}</td>
                <td>
                  <Button variant="outline" radius="full">
                    Modify
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
