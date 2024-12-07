import { Item } from './items';

export interface ItemVariantBase {
  name: string;
  description: string;
  priceInCents: number;
  itemId?: number;
}

export interface ItemVariant extends ItemVariantBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  item: Item;
}

export interface NewItemVariant extends ItemVariantBase {}

export interface EditItemVariant extends ItemVariantBase {}
