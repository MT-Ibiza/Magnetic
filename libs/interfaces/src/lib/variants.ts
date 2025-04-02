import { Item } from './items';

export interface ItemVariantBase {
  name: string;
  description: string;
  priceInCents: number;
  capacity?: number;
  hours?: number;
}

export interface ItemVariant extends ItemVariantBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  item: Item;
}

export interface NewItemVariant extends ItemVariantBase {
  itemId: number;
}

export interface EditItemVariant extends ItemVariantBase {
  itemId: number;
}
