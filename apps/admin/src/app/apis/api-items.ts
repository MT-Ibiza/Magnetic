import {
  ApiResponse,
  Category,
  EditItem,
  Item,
  ItemWithServiceCategories,
  NewItem,
  NewItemFromCategory,
} from '@magnetic/interfaces';
import {
  URL_CREATE_ITEM,
  URL_GET_CATEGORIES,
  URL_GET_ITEM,
  URL_GET_ITEMS,
  URL_NEW_ITEM,
  URL_REMOVE_ITEM,
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

export async function getItem(
  serviceId: number,
  id: number
): Promise<ItemWithServiceCategories> {
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
  params: FormData
): Promise<Item> {
  const url = URL_CREATE_ITEM(serviceId);
  const response = await fetch(url, {
    method: 'POST',
    body: params,
  });

  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);

  return dataJson;
}

export async function editItem(
  serviceId: number,
  itemId: number,
  params: FormData
): Promise<Item> {
  const url = URL_UPDATE_ITEM(serviceId, itemId);
  const response = await fetch(url, {
    method: 'PUT',
    body: params,
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getNewItem(
  serviceId: number
): Promise<NewItemFromCategory> {
  const url = URL_NEW_ITEM(serviceId);
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

export async function deleteItem(
  serviceId: number,
  id: number
): Promise<ApiResponse> {
  const url = URL_REMOVE_ITEM(serviceId, id);
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
