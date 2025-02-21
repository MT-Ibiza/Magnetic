import { Item } from './items';

export interface SeasonPriceBase {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  priceInCents: number;
  itemId: number;
}

export interface SeasonPrice extends SeasonPriceBase {
  id: number;
}

export interface NewSeasonPrice extends SeasonPriceBase {}
export interface EditSeasonPrice extends SeasonPriceBase {}
