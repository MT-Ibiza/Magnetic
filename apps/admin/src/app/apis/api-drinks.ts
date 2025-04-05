import { DrinksList, Item, NewDrinksList } from '@magnetic/interfaces';
import { URL_GET_DRINKS, URL_NEW_DRINKS_LIST } from './api-constants';

export async function getDrinks(): Promise<Item[]> {
  const url = URL_GET_DRINKS;

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

export async function newDrinkList(params: NewDrinksList): Promise<DrinksList> {
  const url = URL_NEW_DRINKS_LIST;
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
  });

  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);

  return dataJson;
}
