import { Item, ItemWithCount, NewItem } from './items';
import { Package } from './packages';
import { NewProvider } from './providers';

export interface ServiceBase {
  name: string;
  description: string;
  packageId: number;
  providerId: number;
  serviceType: string;
  imageUrl: string;
}

export interface Service extends ServiceBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  package: Package;
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
  packageId: number;
  provider?: NewProvider;
  providerId?: number;
  serviceType: string;
  script?: string;
}

export interface EditService extends NewService {}
