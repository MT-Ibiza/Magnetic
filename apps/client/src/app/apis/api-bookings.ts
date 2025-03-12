import { BookingUser } from '@magnetic/interfaces';
import {
  URL_GET_BOOKINGS,
  URL_REQUEST_CHANGES_BOOKINGS,
} from './api-constants';

export async function getBookings(): Promise<BookingUser[]> {
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

export async function requestChangeBooking(
  bookingId: number,
  message: string
): Promise<any> {
  try {
    const accessToken = localStorage.getItem('magnetic_auth');
    if (!accessToken) {
      throw new Error('Access token is missing');
    }
    const url = URL_REQUEST_CHANGES_BOOKINGS(bookingId);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ message }),
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
