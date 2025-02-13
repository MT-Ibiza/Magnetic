import { Cart, CartItem } from '@magnetic/interfaces';
import { URL_GET_CART, URL_ADD_TO_CART, REMOVE_CART } from './api-constants';

export async function getCart(): Promise<Cart> {
  const url = URL_GET_CART;
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message || 'Failed to fetch cart');
  return dataJson;
}

export async function addToCart(params: {
  itemId: number;
  cartItemId?: number;
  quantity: number;
  formData?: any;
}): Promise<CartItem> {
  const url = URL_ADD_TO_CART;
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(params),
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to add item to cart');
  return dataJson;
}

export async function removeCart(): Promise<null> {
  const url = REMOVE_CART;
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to add item to cart');
  return dataJson;
}
