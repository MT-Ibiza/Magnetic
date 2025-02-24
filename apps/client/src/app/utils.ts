import { CartItem, Item, ItemVariant } from '@magnetic/interfaces';
import moment from 'moment';

type GroupedCategory = {
  category: string;
  items: CartItem[];
};

type ServiceTotal = {
  service: string;
  total: number;
};

export function formatDate(date: string | Date) {
  return moment(date).format('MMMM DD, YYYY');
}

export function maxDateToBooking(date: string | Date) {
  return moment(date).subtract(7, 'days');
}

export function userCanMakeBookings(arrivalDate: string | Date) {
  const limitDate = maxDateToBooking(arrivalDate);
  return moment(limitDate).isAfter(moment());
}

export function groupCartItemsByCategory(data: CartItem[]): GroupedCategory[] {
  return data.reduce<GroupedCategory[]>((result, currentItem) => {
    const categoryName = currentItem.item.service?.name;
    let category = result.find((group) => group.category === categoryName);
    if (!category) {
      category = { category: categoryName, items: [] };
      result.push(category);
    }
    category.items.push(currentItem);
    return result;
  }, []);
}

export function calculateTotalsByService(data: CartItem[]): ServiceTotal[] {
  return data.reduce<ServiceTotal[]>((result, currentItem) => {
    const serviceName = currentItem.item.service?.name;
    const itemTotal = currentItem.item.priceInCents * currentItem.quantity;
    let serviceGroup = result.find((group) => group.service === serviceName);
    if (!serviceGroup) {
      serviceGroup = { service: serviceName, total: 0 };
      result.push(serviceGroup);
    }
    serviceGroup.total += itemTotal;
    return result;
  }, []);
}
