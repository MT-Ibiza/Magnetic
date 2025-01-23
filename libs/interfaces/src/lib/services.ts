import { Item, ItemWithCount, NewItem } from './items';
import { Package } from './packages';
import { NewProvider } from './providers';

export interface ServiceBase {
  name: string;
  description: string;
  providerId: number;
  serviceType: string;
  imageUrl?: string;
  termsAndConditions?: string;
}

export interface Service extends ServiceBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  packages: { id: number; name: string }[];
  providerId: number;
  script?: string;
  items: Item[];
}

export interface ServiceInTable extends Service {
  items: ItemWithCount[];
}

export interface NewService {
  name: string;
  description: string;
  items: NewItem[];
  packageIds: number[];
  provider?: NewProvider;
  providerId?: number;
  serviceType: string;
  script?: string;
}

export interface EditService extends NewService {}
