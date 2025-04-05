import { DrinksList, PublicList } from '@magnetic/interfaces';
import { URL_GET_DRINKS_LIST, URL_GET_LISTS } from './api-constants';

export async function getList(listId: number): Promise<DrinksList> {
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
  const url = URL_GET_LISTS(type);
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
