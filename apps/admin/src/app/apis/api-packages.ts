import { NewPackage, Package } from '@magnetic/interfaces';
import { URL_GET_PACKAGES, URL_NEW_PACKAGE } from './api-constants';

export async function getPackages(): Promise<Package[]> {
  const response = await fetch(URL_GET_PACKAGES, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function newPackage(params: NewPackage): Promise<Package> {
  const response = await fetch(URL_NEW_PACKAGE, {
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
