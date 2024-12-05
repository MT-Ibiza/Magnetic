import { Credentials, LoginResponse } from '@magnetic/interfaces';
import { URL_LOGIN } from './api-constants';

export async function login(data: Credentials): Promise<LoginResponse> {
  const response = await fetch(URL_LOGIN, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
