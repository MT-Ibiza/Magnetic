import moment from 'moment';

export function formatDate(date: Date | string, includeTime?: boolean) {
  const format = includeTime ? 'D MMM YYYY hh:mm' : 'D MMM YYYY';
  return moment(date).utc().format(format);
}
