import { URL_GET_BOOKINGS } from './api-constants';

export async function getBookings(): Promise<any> {
  try {
    const accessToken = localStorage.getItem('magnetic_auth');
    if (!accessToken) {
      throw new Error('Access token is missing');
    }
    const url = `${URL_GET_BOOKINGS}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const dataJson = await response.json();

    if (!response.ok) {
      throw new Error(dataJson.message || 'Failed to fetch bookings');
    }

    return dataJson;
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}
