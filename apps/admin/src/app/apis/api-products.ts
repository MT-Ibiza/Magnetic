import { Item, ItemResponse, SearchItemParams } from '@magnetic/interfaces';
import { URL_GET_PRODUCTS, URL_PUBLISH_PRODUCT } from './api-constants';

export async function getProducts(
  params: SearchItemParams
): Promise<ItemResponse> {
  const { itemsPerPage, searchText, categoryId, page, serviceId } = params;
  const searchPage = page || 1;
  const pageSize = itemsPerPage || 20;
  const queryParams: Record<string, string> = {
    page: searchPage.toString(),
    pageSize: pageSize.toString(),
  };

  if (searchText) {
    queryParams.search = searchText;
  }

  if (categoryId) {
    queryParams.categoryId = categoryId.toString();
  }

  if (serviceId) {
    queryParams.serviceId = serviceId.toString();
  }

  const queryString = new URLSearchParams(queryParams).toString();
  const url = queryString
    ? `${URL_GET_PRODUCTS}?${queryString}`
    : `${URL_GET_PRODUCTS}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch products');
  }

  return await response.json();
}

export async function updatePublishStatus({
  itemId,
  isPublished,
}: {
  itemId: number;
  isPublished: boolean;
}): Promise<Item> {
  const url = URL_PUBLISH_PRODUCT(itemId);

  const data = { published: isPublished };

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
