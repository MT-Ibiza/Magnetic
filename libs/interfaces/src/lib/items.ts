export interface ItemBase {
  name: string;
  description: string;
  priceInCents: number;
}
export interface Item extends ItemBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  serviceId: number;
  // cartItems: number;
  // ordenItems: number;
}

export interface NewItem extends ItemBase {
  serviceId: number;
}

export interface EditItem extends ItemBase {
  serviceId: number;
}
