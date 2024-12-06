import { Service } from './services';

export interface ProviderBase {
  name: string;
  phone: string;
  website: string;
  email: string;
}

export interface Provider extends ProviderBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  services: Service[];
}

export interface NewProvider extends ProviderBase {}
export interface EditProvider extends ProviderBase {}
