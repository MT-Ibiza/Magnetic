import {
  EditService,
  Item,
  NewService,
  Package,
  Provider,
  Service,
} from '@magnetic/interfaces';
import {
  URL_DATA_NEW_SERVICE,
  URL_GET_SERVICE,
  URL_GET_SERVICES,
  URL_NEW_SERVICE,
  URL_PUBLISH_PRODUCT,
  URL_UPDATE_SERVICE,
} from './api-constants';

export async function getServices(): Promise<Service[]> {
  const response = await fetch(URL_GET_SERVICES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function getService(id: number): Promise<Service> {
  const url = URL_GET_SERVICE(id);
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

export async function getNewServiceData(): Promise<{
  providers: Provider[];
  packages: Package[];
}> {
  const response = await fetch(URL_DATA_NEW_SERVICE, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function newService(params: FormData): Promise<Service> {
  const response = await fetch(URL_NEW_SERVICE, {
    method: 'POST',
    body: params,
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function editService(
  serviceId: number,
  params: FormData
): Promise<Service> {
  const url = URL_UPDATE_SERVICE(serviceId);
  const response = await fetch(url, {
    method: 'PUT',
    body: params,
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}
