import { Service } from './services';

export interface Package {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  services: Service[];
}

export interface NewPackage {
  name: string;
}
