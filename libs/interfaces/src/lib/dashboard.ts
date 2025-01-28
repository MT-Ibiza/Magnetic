import { Package } from './packages';
import { Service } from './services';
import { User } from './users';

export interface DashboardData {
  packages: Package[];
  services: Service[];
  user: User;
}
