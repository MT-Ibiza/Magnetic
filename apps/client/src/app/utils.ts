import moment from 'moment';

export function maxDateToBooking(date: string | Date) {
  const result = moment(date).subtract(7, 'days');
  return result.format('YYYY-MM-DD');
}
