import { Service } from '@magnetic/interfaces';
import { URL_GET_SERVICES } from './api-constants';

export async function getServices(): Promise<Service[]> {
  const response = await fetch(URL_GET_SERVICES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
