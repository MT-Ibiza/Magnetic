import moment from 'moment';

export function maxDateToBooking(date: string | Date) {
  return moment(date).subtract(7, 'days');
}
