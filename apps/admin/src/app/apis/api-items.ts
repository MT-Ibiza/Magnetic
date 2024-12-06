import { EditItem, Item, NewItem } from '@magnetic/interfaces';
import {
  URL_GET_ITEM,
  URL_GET_ITEMS,
  URL_NEW_ITEM,
  URL_UPDATE_ITEM,
} from './api-constants';

export async function getItems(serviceId: number): Promise<Item[]> {
  const url = URL_GET_ITEMS(serviceId);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getItem(serviceId: number, id: number): Promise<Item> {
  const url = URL_GET_ITEM(serviceId, id);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function newItem(
  serviceId: number,
  params: NewItem
): Promise<Item> {
  const url = URL_NEW_ITEM(serviceId);
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function editItem(
  serviceId: number,
  itemId: number,
  params: EditItem
): Promise<Item> {
  const url = URL_UPDATE_ITEM(serviceId, itemId);
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
