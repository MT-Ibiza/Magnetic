import { UserBase } from '@magnetic/interfaces';
import { URL_GET_CLIENT, URL_UPDATE_CLIENT } from './api-constants';

export async function getClient(): Promise<UserBase> {
  const url = URL_GET_CLIENT;
  const accessToken = localStorage.getItem('magnetic_auth');

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch client');
  }

  return response.json();
}

export async function editClient(params: FormData): Promise<UserBase> {
  const url = URL_UPDATE_CLIENT;
  const accessToken = localStorage.getItem('magnetic_auth');

  if (!accessToken) {
    throw new Error('Authentication token is missing. Please log in again.');
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: params,
  });

  const dataJson = await response.json();
  if (!response.ok) {
    const errorMessage = dataJson.message || 'Failed to update client';
    throw new Error(`Error ${response.status}: ${errorMessage}`);
  }

  return dataJson;
}
