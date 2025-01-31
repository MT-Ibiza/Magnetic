import { Package } from './packages';

export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  arrivalDate?: string;
  image?: string;
  packageId?: number;
  package?: Package;
  cartId?: number;
}

export interface UserBase {
  email: string;
  name?: string;
  firstName: string;
  lastName: string;
  accommodation: string;
  arrivalDate: string;
  departureDate: string;
  passportNumber: string;
  passportAttachmentUrl: string;
  billingAddress: string;
  image?: string;
  phone?: string;
  countryCodePhone?: string;
  countryNamePhone?: string;
  package?: Package;
  packageId?: number;
}

export interface User extends UserBase {
  id: number;
  active: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewUser extends UserBase {
  phone?: string;
  password: string;
  packageId: number;
  role: string;
}

export interface EditUser extends UserBase {
  phone?: string;
  packageId: number;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  name: string;
  arrivalDate: string;
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
