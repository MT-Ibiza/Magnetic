import { PublicList } from '@magnetic/interfaces';
import { URL_GET_PUBLIC_LIST } from './api-constants';

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
