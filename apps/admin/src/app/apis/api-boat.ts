import {
  Category,
  EditItem,
  Boat,
  ItemWithServiceCategories,
  NewItem,
  NewItemFromCategory,
} from '@magnetic/interfaces';
import {
  URL_CREATE_BOAT,
  URL_GET_BOAT,
  URL_GET_BOATS,
  URL_NEW_BOAT,
  URL_UPDATE_BOAT,
} from './api-constants';

export async function getBoats(serviceId: number): Promise<Boat[]> {
  const url = URL_GET_BOATS(serviceId);
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

export async function getBoat(
  serviceId: number,
  id: number
): Promise<ItemWithServiceCategories> {
  const url = URL_GET_BOAT(serviceId, id);
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

export async function newBoat(
  serviceId: number,
  params: NewItem
): Promise<Boat> {
  const url = URL_CREATE_BOAT(serviceId);
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

export async function editBoat(
  serviceId: number,
  itemId: number,
  params: EditItem
): Promise<Boat> {
  const url = URL_UPDATE_BOAT(serviceId, itemId);
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

export async function getNewBoat(
  serviceId: number
): Promise<NewItemFromCategory> {
  const url = URL_NEW_BOAT(serviceId);
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
