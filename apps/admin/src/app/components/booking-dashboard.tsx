import { Text } from '@magnetic/ui';
import { BookingForm } from '@magnetic/interfaces';
import moment from 'moment';
import { Link } from 'react-router-dom';

interface Props {
  title: string;
  bookings: BookingForm[];
}

function BookingDashboard({ title, bookings }: Props) {
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
              {title === 'Upcoming Bookings' ? (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">
                      Arrival Date: {moment(booking.date).format('DD MMM YYYY')}
                    </p>
                    <Link to={`/bookings/${booking.id}`}>
                      <p className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline">
                        View
                      </p>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500">
                    Client: {booking.order.user.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    Accommodation: {booking.service.name}
                  </p>
                </>
              ) : (
                <>
                  <div className="flex justify-between items-center">
                    <p className="text-md font-medium text-gray-900">
                      {booking.service.name}
                    </p>
                    <Link to={`/bookings/${booking.id}`}>
                      <p className="text-sm font-medium text-primary-700 hover:text-primary-800 hover:underline">
                        View
                      </p>
                    </Link>
                  </div>
                  <p className="text-sm text-gray-500">
                    Date: {moment(booking.date).format('DD MMM YYYY')}
                  </p>
                  <p className="text-sm text-gray-500">
                    Client: {booking.order.user.name}
                  </p>
                  <p className="text-sm text-gray-700">
                    Status: {booking.status}
                  </p>
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
