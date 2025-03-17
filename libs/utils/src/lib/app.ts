import moment from 'moment';

export function getNumberMonth(date?: string | Date) {
  return moment(date).utc().month() + 1;
}
