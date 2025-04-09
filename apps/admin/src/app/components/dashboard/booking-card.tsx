import { BookingForm } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface Props {
  booking: BookingForm;
}

function BookingCard(props: Props) {
  const { booking } = props;
  const {
    order: { items },
  } = booking;

  const itemsBooking = items.filter((item) => {
    return item.type === booking.type;
  });

  const mainItem = itemsBooking[0];

  return (
    <div className="flex flex-col border p-3 rounded-lg shadow-sm">
      <div className="flex justify-between items-center">
        <p className="text-md font-medium text-gray-900">
          {booking.service.name}
        </p>
        {getStatusIndicator(booking.status)}
      </div>
      <div>
        {booking.type === 'drinks' ? (
          <Text className="text-gray-500">Drinks</Text>
        ) : (
          <Text className="text-gray-500">{mainItem.item.name}</Text>
        )}
      </div>
      <Text className="text-gray-500">
        {moment(booking.date).format('DD MMM YYYY')}
      </Text>
      <Text className="text-gray-500">
        {booking.order.user
          ? booking.order.user.name
          : booking.order.guestUser?.name}
      </Text>
      <Link to={`/bookings/${booking.id}`}>
        <p className="text-end text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline">
          View
        </p>
      </Link>
    </div>
  );
}

export default BookingCard;

const getStatusIndicator = (status: string) => {
  let color = 'bg-gray-400';
  if (status === 'accepted' || status === 'completed') color = 'bg-green-500';
  else if (status === 'cancelled') color = 'bg-red-500';
  else if (status === 'pending' || status === 'modification_requested')
    color = 'bg-orange-500';

  return (
    <span
      className={`text-sm text-gray-700 inline-block w-3 h-3 rounded-full ${color}`}
    />
  );
};
