import { Text } from '@magnetic/ui';
import { BookingForm } from '@magnetic/interfaces';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  bookings: BookingForm[];
}

function BookingDashboard({ title, bookings }: Props) {
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

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
      <Text className="font-semiBold text-lg font-semibold mb-3">{title}</Text>
      {bookings.length > 0 ? (
        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-col bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              {title === 'Upcoming Clients' ? (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      {moment(booking.order.user.arrivalDate).format(
                        'DD MMM YYYY'
                      )}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {booking.order.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.order.user.accommodation}
                  </p>
                  <Link to={`/clients/${booking.order.user.id}?tab=bookings`}>
                    <p className="text-end text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline">
                      View
                    </p>
                  </Link>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-md font-medium text-gray-900">
                      {booking.service.name}
                    </p>
                    {getStatusIndicator(booking.status)}
                  </div>
                  <p className="text-sm text-gray-500">
                    {moment(booking.date).format('DD MMM YYYY')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {booking.order.user.name}
                  </p>
                  <Link to={`/bookings/${booking.id}`}>
                    <p className="text-end text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline">
                      View
                    </p>
                  </Link>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No bookings available</p>
      )}
    </div>
  );
}

export default BookingDashboard;
