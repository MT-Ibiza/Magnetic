export interface Order {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
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
}
