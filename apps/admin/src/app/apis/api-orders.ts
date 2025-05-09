import {
  Order,
  BookingUser,
  BookingAdmin,
  BookingAdminPagination,
} from '@magnetic/interfaces';
import {
  URL_GET_BOOKING,
  URL_GET_BOOKINGS_ORDERS,
  URL_GET_ORDER,
  URL_GET_ORDERS,
  URL_REMOVE_ORDER,
  URL_UPDATE_BOOKING,
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

export async function getBookingsOrders(
  params: any
): Promise<BookingAdminPagination> {
  const { itemsPerPage, page } = params;
  const searchPage = page || 1;
  const pageSize = itemsPerPage || 20;
  const queryParams: Record<string, string> = {
    page: searchPage.toString(),
    pageSize: pageSize.toString(),
  };

  const queryString = new URLSearchParams(queryParams).toString();
  const url = queryString
    ? `${URL_GET_BOOKINGS_ORDERS}?${queryString}`
    : `${URL_GET_BOOKINGS_ORDERS}`;
  const response = await fetch(url);
  return await response.json();
}

export async function getBooking(id: number): Promise<BookingAdmin> {
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

export async function updateBookingOrder(
  bookingId: number,
  params: {
    orderItemId: number;
    formData: any;
    quantity: number;
  }
): Promise<any> {
  const url = URL_UPDATE_BOOKING(bookingId);
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
