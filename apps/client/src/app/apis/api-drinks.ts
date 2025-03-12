import { Item } from '@magnetic/interfaces';
import { DrinkSearchAttributes } from 'libs/interfaces/src/lib/drinks';
import { URL_SEARCH_DRINKS } from './api-constants';

export async function searchDrinks(
  filters: DrinkSearchAttributes
): Promise<Item[]> {
  const fields = Object.keys(filters);
  const selectedFilters: { [key: string]: any } = {};
  for (const field of fields) {
    const value = filters[field as 'categoriesIds'];
    if (value) {
      selectedFilters[field] = value;
    }
  }
  const queryString = new URLSearchParams(selectedFilters).toString() || '';
  const url = URL_SEARCH_DRINKS(queryString);

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
