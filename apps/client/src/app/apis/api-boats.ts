import {
  BoatAvailability,
  BoatsSearchAttributes,
  Item,
} from '@magnetic/interfaces';
import {
  URL_SEARCH_BOAT_AVAILABILITY,
  URL_SEARCH_BOATS,
} from './api-constants';

export async function searchBoats(
  filters: BoatsSearchAttributes
): Promise<Item[]> {
  const fields = Object.keys(filters);
  const selectedFilters: { [key: string]: any } = {};
  for (const field of fields) {
    const value = filters[field as 'price_gt'];
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

export async function searchAvailabilityBoat(filters: {
  from: string;
  to: string;
  boatId: string;
}): Promise<BoatAvailability[]> {
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value)
  );

  const queryString = new URLSearchParams(validFilters).toString();
  const url = URL_SEARCH_BOAT_AVAILABILITY(queryString);

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
