import { Cart, CartItem } from '@magnetic/interfaces';
import { URL_GET_CART, URL_ADD_TO_CART } from './api-constants';

export async function getCart(userId: number): Promise<Cart> {
  const url = URL_GET_CART(userId);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message || 'Failed to fetch cart');
  return dataJson;
}

export async function addToCart(
  userId: number,
  itemId: number,
  quantity: number
): Promise<CartItem> {
  const url = URL_ADD_TO_CART(userId);
  console.log("userId in addToCart API:", userId);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemId, quantity }),
  });

  const dataJson = await response.json();
  if (!response.ok)
    throw new Error(dataJson.message || 'Failed to add item to cart');
  return dataJson;
}
