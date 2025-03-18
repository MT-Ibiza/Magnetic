import { Order, BookingForm, BookingUser } from '@magnetic/interfaces';
import {
  URL_GET_BOOKING,
  URL_GET_BOOKINGS_ORDERS,
  URL_GET_ORDER,
  URL_GET_ORDERS,
  URL_REMOVE_ORDER,
  URL_UPDATE_BOOKING_STATUS,
} from './api-constants';

export async function getOrders(): Promise<Order[]> {
  try {
    const response = await fetch(URL_GET_ORDERS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataJson = await response.json();

    if (!response.ok) {
      throw new Error(dataJson.message);
    }

    return dataJson;
  } catch (error: any) {
    console.error('Error fetching orders:', error.message);
    throw error;
  }
}

export async function getOrder(id: number): Promise<Order> {
  const url = URL_GET_ORDER(id);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to fetch order');
  return dataJson;
}

export async function getBookingsOrders(): Promise<BookingUser[]> {
  try {
    const response = await fetch(URL_GET_BOOKINGS_ORDERS, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataJson = await response.json();

    if (!response.ok) {
      throw new Error(dataJson.message);
    }

    return dataJson;
  } catch (error: any) {
    console.error('Error fetching orders:', error.message);
    throw error;
  }
}

export async function getBooking(id: number): Promise<BookingUser> {
  const url = URL_GET_BOOKING(id);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to fetch order');
  return dataJson;
}

export async function updateBookingStatus(
  bookingId: number,
  params: {
    status: string;
    text?: string;
  }
): Promise<any> {
  const url = URL_UPDATE_BOOKING_STATUS(bookingId);
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

export async function removeOrder(id: number): Promise<{ message: string }> {
  const url = URL_REMOVE_ORDER(id);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
