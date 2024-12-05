import { NewService, Service } from '@magnetic/interfaces';
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

export async function newService(params: NewService): Promise<Service> {
  const response = await fetch(URL_GET_SERVICES, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
