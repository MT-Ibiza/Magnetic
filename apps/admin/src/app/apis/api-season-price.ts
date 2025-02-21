import {
  EditSeasonPrice,
  SeasonPrice,
  NewSeasonPrice,
} from '@magnetic/interfaces';
import {
  URL_GET_SEASON_PRICE,
  URL_GET_SEASON_PRICES,
  URL_NEW_SEASON_PRICE,
  URL_REMOVE_SEASON_PRICE,
  URL_UPDATE_SEASON_PRICE,
} from './api-constants';

export async function getSeasonPrices(): Promise<SeasonPrice[]> {
  const response = await fetch(URL_GET_SEASON_PRICES);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function newSeasonPrice(
  params: NewSeasonPrice
): Promise<SeasonPrice> {
  const response = await fetch(URL_NEW_SEASON_PRICE, {
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

export async function editSeasonPrice(
  providerId: number,
  params: EditSeasonPrice
): Promise<SeasonPrice> {
  const url = URL_UPDATE_SEASON_PRICE(providerId);
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

export async function getSeasonPrice(userId: number): Promise<SeasonPrice> {
  const url = URL_GET_SEASON_PRICE(userId);
  const response = await fetch(url);
  const dataJson = await response.json();
  if (!response.ok) throw new Error(dataJson.message);
  return dataJson;
}

export async function deleteSeasonPrice(seasonId: number): Promise<string> {
  const url = URL_REMOVE_SEASON_PRICE(seasonId);
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
