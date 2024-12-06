import { Item, NewItem } from './items';
import { Package } from './packages';
import { NewProvider } from './providers';

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
  provider?: NewProvider;
}

export interface EditService extends NewService {
  id: number;
}
