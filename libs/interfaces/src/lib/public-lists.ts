import { Item } from './items';

export interface PublicListItem {
  id: number;
  item: Item;
  itemId: number;
}

export interface PublicListBase {
  name: string;
  slug: string;
  type: string;
  items: PublicListItem[];
}

export interface PublicList extends PublicListBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ParamsPublicList {
  name: string;
  type: string;
  itemsIds: number[];
}
