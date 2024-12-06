import { Service } from './services';

export interface Provider {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  phone: string;
  website: string;
  email: string;
  services: Service[];
}

export interface NewProvider {
  name: string;
  phone: string;
  website: string;
  email: string;
}
