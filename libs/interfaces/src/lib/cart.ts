import { Item } from './items';

export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalItems: number;
  totalPriceInCents: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  id: number;
  item: Item;
  quantity: number;
  formData?: any;
  variantId?: number;
}
