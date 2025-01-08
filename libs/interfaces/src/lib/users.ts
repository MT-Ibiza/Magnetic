import { Package } from './packages';

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  image?: string;
  packageId?: number;
  package?: Package;
  cartId?: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  image?: string;
  phone?: string;
  role: string;
  active: boolean;
  package?: Package;
  packageId?: number;
}

export interface NewUser {
  name: string;
  email: string;
  phone?: string;
  role: string;
  password: string;
  packageId: number;
}

export interface EditUser {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  packageId: number;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  accessToken: string;
  package: Package;
  cartId?: number;
}

export interface SearchUsersParams {
  searchText?: string;
  page?: number;
  itemsPerPage?: number;
  onlyActive?: boolean;
  role?: string;
}

export interface UserResponse {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}
