import { Category } from './categories';
import { Service } from './services';

export interface ItemBase {
  name: string;
  description: string;
  priceInCents: number;
}

export interface Item extends ItemBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  serviceId: number;
  service: Service;
  // cartItems: number;
  // ordenItems: number;
}

export interface ItemWithServiceCategories {
  item: Item;
  categories: Category[];
}

export interface NewItem extends ItemBase {
  serviceId: number;
}

export interface EditItem extends ItemBase {
  serviceId: number;
}

export interface CartItem extends ItemBase {
  id: number;
  quantity: number;
}
