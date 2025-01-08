import { User } from './users';

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
  forms: OrderForm[];
}

export interface ItemBaseFields {
  name: string;
  service: {
    id: number;
    name: string;
    serviceType: string;
  };
}

export interface OrderItem {
  id: number;
  priceInCents: number;
  quantity: number;
  itemId: number;
  orderId: number;
  item: ItemBaseFields;
}

export interface OrderBookingForm {
  data: any;
  serviceId: number;
  itemId?: number;
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
