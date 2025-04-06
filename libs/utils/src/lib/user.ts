import moment from 'moment';

export function getNameFromUsername(firstName: string, lastName?: string) {
  const firstInitial = firstName ? firstName.split(' ')[0] : 'Guest';
  const secondInitial = lastName ? lastName.split(' ').slice(-1) : '';
  return `${firstInitial} ${secondInitial}`;
}

export function userCanMakeBooking(arrivalDate: Date | string): boolean {
  const minArrivalDate = moment().utc().add(7, 'days').startOf('day');
  const arrival = moment(arrivalDate).utc().startOf('day');
  return arrival.isSameOrAfter(minArrivalDate);
}
