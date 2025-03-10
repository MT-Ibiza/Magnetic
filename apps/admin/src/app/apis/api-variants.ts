import {
  ApiResponse,
  EditItemVariant,
  ItemVariant,
  NewItemVariant,
} from '@magnetic/interfaces';
import {
  URL_GET_VARIANT,
  URL_GET_VARIANTS,
  URL_NEW_VARIANT,
  URL_REMOVE_VARIANT,
  URL_UPDATE_VARIANT,
} from './api-constants';

export async function getVariants(): Promise<ItemVariant[]> {
  const response = await fetch(URL_GET_VARIANTS);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getVariant(userId: number): Promise<ItemVariant> {
  const url = URL_GET_VARIANT(userId);
  const response = await fetch(url);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function newVariant(params: NewItemVariant): Promise<ItemVariant> {
  const response = await fetch(URL_NEW_VARIANT, {
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

export async function editVariant(
  providerId: number,
  params: EditItemVariant
): Promise<ItemVariant> {
  const url = URL_UPDATE_VARIANT(providerId);
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

export async function deleteVariant(variantId: number): Promise<ApiResponse> {
  const url = URL_REMOVE_VARIANT(variantId);
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
