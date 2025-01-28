import { DashboardData } from '@magnetic/interfaces';
import { URL_GET_DASHBOARD } from './api-constants';

export async function getDashboard(): Promise<DashboardData> {
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(URL_GET_DASHBOARD, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const dataJson = await response.json();

  if (!response.ok) throw new Error(dataJson.message);

  return dataJson;
}
