import { Package } from './packages';
import { Service } from './services';

export interface DashboardData {
  packages: Package[];
  services: Service[];
}
