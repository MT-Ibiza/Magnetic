import { EditProvider, NewProvider, Provider } from '@magnetic/interfaces';
import {
  URL_GET_PROVIDER,
  URL_GET_PROVIDERS,
  URL_NEW_PROVIDER,
  URL_REMOVE_PROVIDER,
  URL_UPDATE_PROVIDER,
} from './api-constants';

export async function getProviders(): Promise<Provider[]> {
  const response = await fetch(URL_GET_PROVIDERS);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function newProvider(params: NewProvider): Promise<Provider> {
  const response = await fetch(URL_NEW_PROVIDER, {
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

export async function editProvider(
  providerId: number,
  params: EditProvider
): Promise<Provider> {
  const url = URL_UPDATE_PROVIDER(providerId);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getProvider(providerId: number): Promise<Provider> {
  const url = URL_GET_PROVIDER(providerId);
  const response = await fetch(url);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function removeProvider(providerId: number): Promise<Provider> {
  const url = URL_REMOVE_PROVIDER(providerId);
  const response = await fetch(url, {
    method: 'DELETE',
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
