import { Item } from './items';

export interface CategoryBase {
  name: string;
  description: string;
  serviceId?: number;
  formType?: string;
  service?: {
    id: number;
    name: string;
  };
}

export interface Category extends CategoryBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  items: Item[];
  position: number;
}

export interface NewCategory extends CategoryBase {}

export interface EditCategory extends CategoryBase {}
