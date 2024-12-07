import { Category, EditCategory, NewCategory } from '@magnetic/interfaces';
import {
  URL_GET_CATEGORIES,
  URL_NEW_CATEGORY,
  URL_UPDATE_CATEGORY,
} from './api-constants';

export async function getCategories(): Promise<Category[]> {
  const url = URL_GET_CATEGORIES;
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

export async function newCategory(params: NewCategory): Promise<Category> {
  const url = URL_NEW_CATEGORY;
  const response = await fetch(url, {
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

export async function editCategory(
  categoryId: number,
  params: EditCategory
): Promise<Category> {
  const url = URL_UPDATE_CATEGORY(categoryId);
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
