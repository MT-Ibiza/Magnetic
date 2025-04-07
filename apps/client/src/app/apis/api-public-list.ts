import { Item, PublicList } from '@magnetic/interfaces';
import { URL_GET_PUBLIC_ITEM_LIST, URL_GET_PUBLIC_LIST } from './api-constants';

export async function getPublicList(slug: string): Promise<PublicList> {
  const url = URL_GET_PUBLIC_LIST(slug);
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

export async function getPublicItem(slug: string, id: number): Promise<Item> {
  const url = URL_GET_PUBLIC_ITEM_LIST(slug, id);
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
