import moment from 'moment';
import { BookingUser } from '@magnetic/interfaces';

export function sortUserBookingsByDate(bookings: BookingUser[]) {
  return bookings.sort(
    (a, b) =>
      moment(a.booking.date).valueOf() - moment(b.booking.date).valueOf()
  );
}
