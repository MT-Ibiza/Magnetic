import { Cart, CartItem, EditCartItem } from '@magnetic/interfaces';
import {
  URL_GET_GUEST_CART,
  URL_ADD_BOAT_TO_GUEST_CART,
  URL_REMOVE_GUEST_CART_ITEM,
  URL_ADD_DRINK_TO_GUEST_CART,
} from './api-constants';

export async function getGuestCart(): Promise<Cart> {
  const url = URL_GET_GUEST_CART;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message || 'Failed to fetch cart');
  return dataJson;
}

export async function addItemDrinkToGuestCart(params: {
  itemId: number;
  cartItemId?: number;
  quantity: number;
  formData?: any;
}): Promise<{ message: string; cartItem: CartItem }> {
  const url = URL_ADD_DRINK_TO_GUEST_CART;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
    credentials: 'include',
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to add item to cart');
  return dataJson;
}

export async function addItemBoatToGuestCart(params: {
  itemId: number;
  formData: any;
  seasonId?: number;
}): Promise<{ message: string; cartItem: CartItem }> {
  const url = URL_ADD_BOAT_TO_GUEST_CART;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(params),
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to add boat to cart');
  return dataJson;
}

export async function deleteGuestCartItem(cartItemId: number): Promise<null> {
  const url = URL_REMOVE_GUEST_CART_ITEM(cartItemId);
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

// export async function updateFormCartItem(
//   params: EditCartItem
// ): Promise<{ message: string; cartItem: CartItem }> {
//   const url = URL_EDIT_FORM_GUEST_CART_ITEM;
//   const accessToken = localStorage.getItem('magnetic_auth');
//   const response = await fetch(url, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(params),
//   });

//   const dataJson = await response.json();
//   if (!response.ok)
//     throw new Error(dataJson.message || 'Failed to add item to cart');
//   return dataJson;
// }
