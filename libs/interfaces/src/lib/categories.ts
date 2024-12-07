import { Item } from './items';

export interface CategoryBase {
  name: string;
  description: string;
}

export interface Category extends CategoryBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  items: Item[];
}

export interface NewCategory extends CategoryBase {}

export interface EditCategory extends CategoryBase {}
