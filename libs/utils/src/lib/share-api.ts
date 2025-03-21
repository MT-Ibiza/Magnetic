import { BoatAvailability } from '@magnetic/interfaces';

export async function searchAvailabilityBoat(
  filters: {
    from: string;
    to: string;
    boatId: string;
  },
  url: string
): Promise<BoatAvailability[]> {
  const validFilters = Object.fromEntries(
    Object.entries(filters).filter(([_, value]) => value)
  );

  const queryString = new URLSearchParams(validFilters).toString();
  const URL_GET = `${url}?${queryString}`;

  try {
    const response = await fetch(URL_GET, {
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
