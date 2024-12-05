export interface Item {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  description: string;
  priceInCents: number;
  serviceId: number;
  // cartItems: number;
  // ordenItems: number;
}
