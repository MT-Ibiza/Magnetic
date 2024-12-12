import { DashboardData } from '@magnetic/interfaces';
import { URL_GET_DASHBOARD } from './api-constants';

export async function getDashboard(): Promise<DashboardData> {
  const response = await fetch(URL_GET_DASHBOARD, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataJson = await response.json();

  if (!response.ok) throw new Error(dataJson.message);

  return {
    packages: dataJson.packages,
    services: dataJson.services,
  };
}
