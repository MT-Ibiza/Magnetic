import { BoatAvailability } from '@magnetic/interfaces';
import { URL_IMPORT_CALENDAR } from './api-constants';

export async function importCalendarEvents(boatId: number): Promise<any> {
  const response = await fetch(URL_IMPORT_CALENDAR(boatId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
