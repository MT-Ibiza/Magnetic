import { BoatsSearchAttributes, Item } from '@magnetic/interfaces';
import { URL_SEARCH_BOATS } from './api-constants';

export async function searchBoats(
  filters: BoatsSearchAttributes
): Promise<Item[]> {
  const fields = Object.keys(filters);
  const selectedFilters: { [key: string]: any } = {};
  for (const field of fields) {
    const value = filters[field as 'capacity'];
    if (value) {
      selectedFilters[field] = value;
    }
  }
  const queryString = new URLSearchParams(selectedFilters).toString() || '';
  const url = URL_SEARCH_BOATS(queryString);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${accessToken}`,
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
