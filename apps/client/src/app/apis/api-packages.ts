import { Package } from '@magnetic/interfaces';
import { URL_GET_PACKAGE, URL_GET_PACKAGES } from './api-constants';

export async function getPackage(id: number): Promise<{ package: Package }> {
  const url = URL_GET_PACKAGE(id);
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const dataJson = await response.json();
  console.log(dataJson);
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

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
