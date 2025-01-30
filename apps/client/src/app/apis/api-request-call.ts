import { URL_REQUEST_CALL } from './api-constants';

export async function requestACall(data: {
  name: string;
  date: string;
  time: string;
  email: string;
  notes?: string;
}): Promise<any> {
  const url = URL_REQUEST_CALL;
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to add item to cart');
  return dataJson;
}
