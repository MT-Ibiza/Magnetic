import { URL_VALIDATE_PAYMENT } from './api-constants';

export async function validatePayment(data: any): Promise<any> {
  const url = URL_VALIDATE_PAYMENT;
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
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
