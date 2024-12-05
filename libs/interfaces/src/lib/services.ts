import { Item, NewItem } from './items';
import { Package } from './packages';

export interface Service {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  packageId: number;
  package: Package;
  providerId: number;
  items: Item[];
}

export interface NewService {
  name: string;
  description: string;
  items: NewItem[];
  packageId: number;
}

export interface EditService extends NewService {
  id: number;
}
