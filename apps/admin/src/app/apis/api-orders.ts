import { Order, BookingForm, BookingUser } from '@magnetic/interfaces';
import {
  URL_GET_BOOKING,
  URL_GET_BOOKINGS_ORDERS,
  URL_GET_ORDER,
  URL_GET_ORDERS,
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

export async function getBooking(id: number): Promise<BookingForm> {
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
