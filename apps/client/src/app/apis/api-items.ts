import {
  ItemWithServiceCategories,
} from '@magnetic/interfaces';
import {
  URL_GET_ITEM,
} from './api-constants';


export async function getItem(
  serviceId: number,
  id: number
): Promise<ItemWithServiceCategories> {
  const url = URL_GET_ITEM(serviceId, id);
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

