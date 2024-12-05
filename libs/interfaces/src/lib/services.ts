import { Item } from './items';

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
