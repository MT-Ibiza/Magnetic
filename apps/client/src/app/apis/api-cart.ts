import { Cart, CartItem, EditCartItem } from '@magnetic/interfaces';
import {
  URL_GET_CART,
  URL_ADD_SERVICE_TO_CART,
  REMOVE_CART,
  URL_ADD_PRODUCT_TO_CART,
  URL_ADD_BOAT_TO_CART,
  URL_REMOVE_CART_ITEM,
  URL_ADD_DRINK_TO_CART,
  URL_EDIT_FORM_CART_ITEM,
  REMOVE_GUEST_CART,
  URL_REMOVE_GUEST_CART_ITEM,
} from './api-constants';

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

export async function addItemCartDrink(params: {
  itemId: number;
  cartItemId?: number;
  quantity: number;
  formData?: any;
}): Promise<{ message: string; cartItem: CartItem }> {
  const url = URL_ADD_DRINK_TO_CART;
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

export async function createItemCartService(params: {
  itemId: number;
  cartItemId?: number;
  quantity: number;
  formData?: any;
  variantId?: number;
}): Promise<{ message: string; cartItem: CartItem }> {
  const url = URL_ADD_SERVICE_TO_CART;
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

export async function removeServiceCart(): Promise<null> {
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

export async function createItemCartProduct(params: {
  itemId: number;
  cartItemId?: number;
  quantity: number;
  formData?: any;
}): Promise<{ message: string; cartItem: CartItem }> {
  const url = URL_ADD_PRODUCT_TO_CART;
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

export async function createItemBoatToCart(params: {
  itemId: number;
  formData: any;
  seasonId?: number;
}): Promise<{ message: string; cartItem: CartItem }> {
  const url = URL_ADD_BOAT_TO_CART;
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
    throw new Error(dataJson.message || 'Failed to add boat to cart');
  return dataJson;
}

export async function deleteCartItem(cartItemId: number): Promise<null> {
  const url = URL_REMOVE_CART_ITEM(cartItemId);
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

export async function updateFormCartItem(
  params: EditCartItem
): Promise<{ message: string; cartItem: CartItem }> {
  const url = URL_EDIT_FORM_CART_ITEM;
  const accessToken = localStorage.getItem('magnetic_auth');
  const response = await fetch(url, {
    method: 'PUT',
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

export async function removeGuestCart(): Promise<null> {
  const url = REMOVE_GUEST_CART;
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to add item to cart');
  return dataJson;
}

export async function deleteGuestCartItem(cartItemId: number): Promise<null> {
  const url = URL_REMOVE_GUEST_CART_ITEM(cartItemId);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to add item to cart');
  return dataJson;
}
