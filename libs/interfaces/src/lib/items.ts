import { BoatBase } from './boats';
import { Category } from './categories';
import { DrinkBase } from './drinks';
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
  description: string;
  priceInCents: number;
  categoryId?: number | null;
  category?: Category;
  boatAttributes?: BoatBase;
  drinkAttributes?: DrinkBase;
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
}

export interface ItemWithCount extends Item {
  _count?: {
    variants: number;
    images?: number;
  };
}

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalItems: number;
  totalPriceInCents: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewItem extends ItemBase {
  serviceId: number;
  boatAttributes?: BoatBase;
}

export interface Image {
  id: number;
  url: string;
  itemId: number;
  createdAt: Date;
}

export interface EditItem extends ItemBase {
  serviceId: number;
}

export interface CartItem {
  id: number;
  item: Item;
  quantity: number;
  formData?: any;
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
