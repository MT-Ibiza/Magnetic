import { CartItem } from '@magnetic/interfaces';

export type ServiceTotal = {
  service: string;
  serviceType: string;
  total: number;
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
