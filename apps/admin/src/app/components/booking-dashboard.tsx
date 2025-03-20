import { Text } from '@magnetic/ui';
import { BookingForm } from '@magnetic/interfaces';
import BookingCard from './dashboard/booking-card';
import UpcomingBookingCard from './dashboard/upcoming-booking-card';

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
          {bookings.map((booking, index) => (
            <>
              {title === 'Upcoming Clients' ? (
                <UpcomingBookingCard booking={booking} key={index} />
              ) : (
                <BookingCard booking={booking} key={index} />
              )}
            </>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No bookings available</p>
      )}
    </div>
  );
}

export default BookingDashboard;
