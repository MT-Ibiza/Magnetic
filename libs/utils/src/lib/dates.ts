import moment from 'moment';

export function formatDate(date: string | Date) {
  return moment(date).format('MMMM DD, YYYY');
}

export function formatTime(time: string) {
  return moment(time, 'HH:mm').format('h:mm A');
}
