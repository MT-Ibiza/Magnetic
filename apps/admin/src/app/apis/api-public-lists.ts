import { Item, ParamsPublicList, PublicList } from '@magnetic/interfaces';
import {
  URL_GET_DRINKS_LIST,
  URL_GET_ITEMS_SERVICE,
  URL_GET_PUBLIC_LISTS,
  URL_NEW_PUBLIC_LIST,
  URL_REMOVE_PUBLIC_LIST,
  URL_UPDATE_PUBLIC_LIST,
} from './api-constants';

export async function getList(listId: number): Promise<PublicList> {
  const url = URL_GET_DRINKS_LIST(listId);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataJson = await response.json();

    if (!response.ok) {
      throw new Error(dataJson.message || 'Failed to fetch boats');
    }

    return dataJson;
  } catch (error: any) {
    console.error('Error fetching boats:', error);
    throw error;
  }
}

export async function getLists(type: string): Promise<PublicList[]> {
  const url = URL_GET_PUBLIC_LISTS(type);
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataJson = await response.json();

    if (!response.ok) {
      throw new Error(dataJson.message || 'Failed to fetch boats');
    }

    return dataJson;
  } catch (error: any) {
    console.error('Error fetching boats:', error);
    throw error;
  }
}

export async function getItemsByService(type: string): Promise<Item[]> {
  const url = URL_GET_ITEMS_SERVICE(type);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const dataJson = await response.json();

    if (!response.ok) {
      throw new Error(dataJson.message || 'Failed to fetch boats');
    }

    return dataJson;
  } catch (error: any) {
    console.error('Error fetching boats:', error);
    throw error;
  }
}

export async function newPublicList(
  params: ParamsPublicList
): Promise<PublicList> {
  const url = URL_NEW_PUBLIC_LIST;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
  });

  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);

  return dataJson;
}

export async function editPublicList(
  listId: number,
  params: ParamsPublicList
): Promise<PublicList> {
  const url = URL_UPDATE_PUBLIC_LIST(listId);
  const response = await fetch(url, {
    method: 'PUT',
    body: JSON.stringify(params),
  });

  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);

  return dataJson;
}

export async function deletePublicList(listId: number): Promise<any> {
  const url = URL_REMOVE_PUBLIC_LIST(listId);
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
