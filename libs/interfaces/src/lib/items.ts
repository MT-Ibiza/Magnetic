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

export interface NewItem {
  name: string;
  description: string;
  priceInCents: number;
}
