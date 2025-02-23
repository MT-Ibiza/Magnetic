import { SortImages } from '@magnetic/interfaces';
import { URL_SORT_IMAGES } from './api-constants';

export async function sortImages(
  params: SortImages
): Promise<{ message: string }> {
  const response = await fetch(URL_SORT_IMAGES, {
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
