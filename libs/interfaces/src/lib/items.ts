import { BoatBase } from './boats';
import { Category } from './categories';
import { DrinkBase } from './drinks';
import { SeasonPrice } from './season-prices';
import { Service } from './services';
import { ItemVariant } from './variants';

export interface SearchItemParams {
  searchText?: string;
  page?: number;
  itemsPerPage?: number;
  categoryId?: number;
  serviceId?: number;
}

export interface ItemBase {
  name: string;
  capacity: number;
  description: string;
  priceInCents: number;
  categoryId?: number | null;
  category?: Category;
  boatAttributes?: BoatBase;
  drinkAttributes?: DrinkBase;
  transferAttributes?: {
    capacity: number;
  };
  childcareAttributes?: {
    hours: number;
  };
  images: Image[];
  removeImagesIds?: number[];
}

export interface ItemResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  products: Item[];
}

export interface Item extends ItemBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  serviceId: number;
  service: Service;
  variants: ItemVariant[];
  published: boolean;
  priceInCents: number;
  seasonPrices: SeasonPrice[];
  position: number;
}

export interface ItemWithCount extends Item {
  _count?: {
    variants: number;
    images?: number;
  };
}

export interface NewItem extends ItemBase {
  serviceId: number;
  boatAttributes?: BoatBase;
}

export interface ImageBase {
  id: number;
  url: string;
  position: number;
  itemId: number;
}

export interface Image extends ImageBase {
  updatedAt: Date;
  createdAt: Date;
}

export interface EditItem extends ItemBase {
  serviceId: number;
}

export interface ItemWithServiceCategories {
  item: Item;
  categories: Category[];
  service: Service;
}

export interface NewItemFromCategory {
  service: Service;
  categories: Category[];
}

export interface SortImages {
  itemId: number;
  positions: { imageId: number; position: number }[];
}

export interface SortCategories {
  serviceId: number;
  positions: { categoryId: number; position: number }[];
}

export interface SortItems {
  positions: { itemId: number; position: number }[];
}
