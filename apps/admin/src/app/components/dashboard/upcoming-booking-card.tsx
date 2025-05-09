import { User } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface Props {
  user: User;
}

function UpcomingBookingCard(props: Props) {
  const { user } = props;

  return (
    <div className="flex flex-col border p-3 rounded-lg shadow-sm">
      <>
        <div className="flex justify-between items-center">
          <Text className="text-gray-500">
            {moment(user.arrivalDate).format('DD MMM YYYY')}
          </Text>
        </div>
        <Text className="text-gray-500">{user.name}</Text>
        <Text className="text-gray-500">{user.accommodation}</Text>
        <Link to={`/clients/${user.id}?tab=bookings`}>
          <p className="text-end text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline">
            View
          </p>
        </Link>
      </>
    </div>
  );
}

export default UpcomingBookingCard;
