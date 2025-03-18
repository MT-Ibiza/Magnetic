import { AdminDashboard } from '@magnetic/interfaces';
import { URL_GET_DASHBOARD } from './api-constants';

export async function getAdminDashboard(): Promise<AdminDashboard> {
  const url = URL_GET_DASHBOARD;
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
