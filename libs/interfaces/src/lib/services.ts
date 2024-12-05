import { Item, NewItem } from './items';

export interface Service {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  packageId: number;
  providerId: number;
  items: Item[];
}

export interface NewService {
  name: string;
  description: string;
  items: NewItem[];
}

export interface EditService extends NewService {
  id: number;
}
