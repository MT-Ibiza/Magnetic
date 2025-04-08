import { Cart, CartItem, Order, OrderForm } from '@magnetic/interfaces';
import {
  URL_CREATE_ORDER,
  URL_EDIT_FORM_ORDER,
  URL_GET_ORDER,
  URL_GET_ORDERS,
} from './api-constants';

export async function createOrder(params?: {
  guestEmail: string;
  guestName?: string;
}): Promise<Order> {
  console.log(params);
  const url = URL_CREATE_ORDER;
  const accessToken = localStorage.getItem('magnetic_auth');

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
    credentials: 'include',
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to create order');
  return dataJson;
}

export async function getOrder(id: number): Promise<Order> {
  const url = URL_GET_ORDER(id);
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to fetch order');
  return dataJson;
}

export async function getOrders(): Promise<Order[]> {
  const url = URL_GET_ORDERS;
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to fetch order');
  return dataJson;
}

export async function editFormOrder({
  id,
  formData,
}: {
  id: number;
  formData: any;
}): Promise<OrderForm> {
  const url = URL_EDIT_FORM_ORDER(id);
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(formData),
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to fetch order');
  return dataJson;
}
