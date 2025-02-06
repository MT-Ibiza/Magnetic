import { AirtableBoatResponse } from '@magnetic/interfaces';
import { URL_GET_AIRTABLE_BOATS } from './api-constants';

export async function getBoatsAirtable({
  offset,
}: {
  offset?: string;
}): Promise<AirtableBoatResponse> {
  const queryString = offset ? new URLSearchParams({ offset }).toString() : '';
  const url = `${URL_GET_AIRTABLE_BOATS}?${queryString}`;
  const response = await fetch(url);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
