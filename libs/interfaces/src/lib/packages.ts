import { Service } from './services';

export interface Package {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description?: string;
  features?: string;
  priceInCents: number;
  services: Service[];
}

export interface NewPackage {
  name: string;
}
