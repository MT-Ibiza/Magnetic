import { Item } from './items';

export interface SeasonPriceBase {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  priceInCents: number;
  itemId: number;
}

export interface SeasonPrice {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewSeasonPrice extends SeasonPriceBase {}
export interface EditSeasonPrice extends SeasonPriceBase {}
