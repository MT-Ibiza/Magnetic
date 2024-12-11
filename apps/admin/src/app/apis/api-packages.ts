import { EditPackage, NewPackage, Package } from '@magnetic/interfaces';
import { URL_DATA_NEW_PACKAGE, URL_DELETE_PACKAGE, URL_GET_PACKAGE, URL_GET_PACKAGES, URL_NEW_PACKAGE, URL_UPDATE_PACKAGE } from './api-constants';

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

export async function getNewPackageData(): Promise<{
  packages: Package[];
}> {
  const response = await fetch(URL_DATA_NEW_PACKAGE, {
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

export async function editPackage(
  packageId: number,
  params: EditPackage
): Promise<Package> {
  const url = URL_UPDATE_PACKAGE(packageId);
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

export async function getPackage(id: number): Promise<{package: Package}> {
  const url = URL_GET_PACKAGE(id);
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

export async function removePackage(id: number): Promise<{ message: string }> {
  const url = URL_DELETE_PACKAGE(id);
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