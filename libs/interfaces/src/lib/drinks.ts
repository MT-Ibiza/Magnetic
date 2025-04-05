import { Item } from './items';

export interface DrinkBase {
  size?: string;
  units: number;
  itemId: number;
}

export interface DrinkSearchAttributes {
  categoriesIds?: string;
  name?: string;
}

export interface DrinksListItem {
  id: number;
  drinkItemListId: number;
  item: Item;
  itemId: number;
}

export interface DrinksListBase {
  name: string;
  slug: string;
  description: string;
  items: DrinksListItem[];
}

export interface DrinksList extends DrinksListBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewDrinksList {
  name: string;
  itemsIds: number[];
}
