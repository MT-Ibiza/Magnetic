import { Cart, CartItem, Order } from '@magnetic/interfaces';
import { URL_CREATE_ORDER, URL_GET_ORDER, accessToken } from './api-constants';

export async function createOrder(): Promise<Order> {
  const url = URL_CREATE_ORDER;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to create order');
  return dataJson;
}

export async function getOrder(id: number): Promise<Order> {
  const url = URL_GET_ORDER(id);
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
