import { Service } from '@magnetic/interfaces';
import {
  URL_GET_SERVICE,
  URL_GET_SERVICE_BOAT,
  URL_GET_SERVICE_DRINKS,
  URL_GET_SERVICES,
} from './api-constants';

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

export async function getService(id: number): Promise<Service> {
  const url = URL_GET_SERVICE(id);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getBoatService(): Promise<Service> {
  const url = URL_GET_SERVICE_BOAT;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getDrinksService(): Promise<Service> {
  const url = URL_GET_SERVICE_DRINKS;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
