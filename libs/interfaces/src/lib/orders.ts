import { Image } from './items';
import { User, UserBase } from './users';
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
  totalWithVatInCents: number;
  forms: OrderForm[];
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
  orderId: number;
  item: ItemBaseFields;
  variantId?: number;
  variant?: ItemVariant;
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
    user: {
      name: string;
    };
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
  user: User;
  booking: BookingForm;
  orderItem: OrderItem;
}
