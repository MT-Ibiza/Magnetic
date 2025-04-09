import { Image } from './items';
import { GuestUser, User } from './users';
import { ItemVariant } from './variants';

export interface Order {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  user: User;
  items: OrderItem[];
  userId: number;
  status: string;
  totalInCents: number;
  vatInCents: number;
  feeInCents: number;
  forms: BookingForm[];
  guestUser?: GuestUser;
}

export interface ItemBaseFields {
  name: string;
  images: Image[];
  service: {
    id: number;
    name: string;
    serviceType: string;
  };
  drinkAttributes?: {
    id: number;
  };
}

export interface OrderItem {
  id: number;
  priceInCents: number;
  quantity: number;
  itemId: number;
  hours: number;
  orderId: number;
  item: ItemBaseFields;
  variantId?: number;
  variant?: ItemVariant;
  type: string;
  cartItemId: number;
}

export interface OrderBookingForm {
  data: any;
  status: string;
  serviceId: number;
  itemId?: number;
  modificationRequest?: string;
  modificationResponse?: string;
  cancellationRequest?: string;
  cancellationResponse?: string;
  refundedAmountInCents?: number;
}

export interface OrderForm {
  id: number;
  formData: any;
  serviceId: number;
  orderId: number;
  orderItemId?: number;
  service: {
    name: string;
    serviceType: string;
  };
}

export interface BookingForm {
  id: number;
  orderItemId?: number;
  cartItemId: number;
  formData: any;
  orderId: number;
  serviceId: number;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  status: string;
  modificationRequest?: string;
  modificationResponse?: string;
  cancellationRequest?: string;
  cancellationResponse?: string;
  refundedAmountInCents?: number;
  order: {
    id: number;
    status: string;
    totalInCents: number;
    guestUser?: GuestUser;
    user?: {
      name: string;
      id: number;
      accommodation: string;
      arrivalDate: Date;
    };
    items: OrderItem[];
  };
  service: {
    name: string;
    serviceType: string;
    id: number;
    imageUrl: string;
  };
  type: string;
}

export interface BookingUser {
  user?: User;
  booking: BookingForm;
  orderItems: OrderItem[];
  guestUser?: GuestUser;
}

export interface BookingAdmin {
  user: User;
  booking: BookingForm;
  orderItems: OrderItem[];
  guestUser?: GuestUser;
}

export interface AdminDashboard {
  new: BookingForm[];
  active: BookingForm[];
  pending: BookingForm[];
}

export interface BookingAdminPagination {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  bookings: BookingUser[];
}
