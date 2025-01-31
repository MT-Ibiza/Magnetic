import moment from 'moment';

export function maxDateToBooking(date: string | Date) {
  return moment(date).subtract(7, 'days');
}

export function userCanMakeBookings(arrivalDate: string | Date) {
  const limitDate = maxDateToBooking(arrivalDate);
  return moment(limitDate).isAfter(moment());
}
