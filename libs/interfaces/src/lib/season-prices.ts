import { Item } from './items';

export interface SeasonPriceBase {
  startMonth: number;
  startDay: number;
  endMonth: number;
  endDay: number;
  priceInCents: number;
}

export interface SeasonPrice {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  itemId: number;
}
