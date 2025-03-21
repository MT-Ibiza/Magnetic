import { BoatAvailability } from '@magnetic/interfaces';
import moment from 'moment';

export function getNumberMonth(date?: string | Date) {
  return moment(date).utc().month() + 1;
}

export function bookedBoatDates(availability: BoatAvailability[]) {
  return availability.flatMap(({ startDate, endDate }) => {
    const start = moment(startDate);
    const end = moment(endDate);
    return Array.from({ length: end.diff(start, 'days') + 1 }, (_, i) =>
      start.clone().add(i, 'days').toDate()
    );
  });
}
