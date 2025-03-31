import { CartItem, OrderItem } from '@magnetic/interfaces';

export type ServiceTotal = {
  service: string;
  serviceType: string;
  total: number;
};

type GroupedCategory = {
  category: string;
  categoryId: number;
  type: string;
  items: OrderItem[];
};

export function getTotalByService(items: CartItem[]): ServiceTotal[] {
  return items.reduce<ServiceTotal[]>((result, currentItem) => {
    const serviceName = currentItem.item.service?.name;
    const serviceType = currentItem.item.service?.serviceType;
    const itemTotal = currentItem.priceInCents * currentItem.quantity;
    let serviceGroup = result.find((group) => group.service === serviceName);
    if (!serviceGroup) {
      serviceGroup = { service: serviceName, total: 0, serviceType };
      result.push(serviceGroup);
    }
    serviceGroup.total += itemTotal;
    return result;
  }, []);
}

export function calculateTotalCartItems(items: CartItem[]): number {
  return items.reduce<number>((result, currentItem) => {
    const itemTotal = currentItem.item.priceInCents * currentItem.quantity;
    result += itemTotal;
    return result;
  }, 0);
}

export function orderItemsByCategory(items: OrderItem[]): GroupedCategory[] {
  return items.reduce<GroupedCategory[]>((result, currentItem) => {
    const categoryName = currentItem.item.service?.name;
    const categoryType = currentItem.item.service?.serviceType;
    const categoryId = currentItem.item.service?.id;
    let category = result.find((group) => group.category === categoryName);
    if (!category) {
      category = {
        category: categoryName,
        items: [],
        type: categoryType,
        categoryId,
      };
      result.push(category);
    }
    category.items.push(currentItem);
    return result;
  }, []);
}
