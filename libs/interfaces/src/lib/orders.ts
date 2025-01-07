export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

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
}

export interface OrderItem {
  id: number;
  priceInCents: number;
  quantity: number;
  itemId: number;
  orderId: number;
  item: {
    name: string;
    service: {
      id: number;
      name: string;
      serviceType: string;
    };
  };
}
