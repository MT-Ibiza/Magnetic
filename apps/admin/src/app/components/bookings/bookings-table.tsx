import Loading from '../loading';
import { ErrorText } from '../error-text';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Button, Text } from '@magnetic/ui';
import { useBookings } from '../../hooks/useBookings';
import { placeholderItemImage } from '../../constants';

interface Props {}

export function BookingsTable(props: Props) {
  const {} = props;
  const { isLoading, isError, bookings, error, hasNextPage, fetchNextPage } =
    useBookings({
      itemsPerPage: 10,
    });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div className="">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Booking</th>
            <th>Date</th>
            <th>Client</th>
            <th>Service</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((elm, index) => {
            const { booking, user, orderItems, guestUser } = elm;
            const orderItem = orderItems[0];
            return (
              <tr className="hover" key={index}>
                <td>
                  <Link to={`/bookings/${booking.id}`}>
                    <Text size="1" className="underline">
                      Booking #{booking.id}
                    </Text>
                  </Link>
                </td>
                <td>
                  <Text size="1" className="text-gray-500">
                    {booking.date
                      ? moment(booking.date).format('DD MMM YYYY')
                      : 'n/a'}
                  </Text>
                </td>
                <td>
                  {user ? (
                    <Link to={`/clients/${user.id}`}>
                      <p className="hover:text-primary-500 hover:underline">
                        {user.name}
                      </p>
                    </Link>
                  ) : (
                    <Text>{guestUser ? guestUser.name : 'Guest User'}</Text>
                  )}
                </td>
                <td>
                  <div className="flex gap-3 items-center text-neutral-6000 dark:text-neutral-300">
                    <img
                      className="w-16 h-10 object-cover rounded-md"
                      src={
                        orderItem?.item?.images[0]?.url || placeholderItemImage
                      }
                    />
                    {orderItem?.item?.drinkAttributes ? (
                      <div className="flex flex-col gap-1">
                        <Text>Drink Service</Text>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-1">
                        <Text>{orderItem?.item?.name || 'N/A'}</Text>
                        <Text size="1" className="text-gray-500">
                          {orderItem?.variant?.name}
                        </Text>
                      </div>
                    )}
                  </div>
                </td>
                <td className="ml-[25px] flex items-center">
                  {getStatusIndicator(booking.status)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {hasNextPage && (
        <div className="text-center">
          <Button
            className="text-center m-5 bg-primary hover:bg-primary-800"
            variant="solid"
            onClick={() => {
              fetchNextPage();
            }}
          >
            Load More Bookings
          </Button>
        </div>
      )}
    </div>
  );
}

const getStatusIndicator = (status: string) => {
  let color = 'bg-gray-400';
  if (status === 'accepted' || status === 'completed') color = 'bg-green-500';
  else if (status === 'cancelled') color = 'bg-red-500';
  else if (status === 'pending' || status === 'modification_requested')
    color = 'bg-orange-500';
  return <span className={`p-[7px] w-3 h-3 rounded-full ${color}`} />;
};
