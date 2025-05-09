import { BoatAvailability, CartItem } from '@magnetic/interfaces';
import moment from 'moment';

type GroupedCategory = {
  category: string;
  categoryId: number;
  type: string;
  items: CartItem[];
};

export function formatDate(date: string | Date) {
  return moment(date).format('MMMM DD, YYYY');
}

export function maxDateToBooking(date: string | Date) {
  return moment(date).utc().subtract(7, 'days');
}

export function userCanMakeBookings(arrivalDate: string | Date) {
  const limitDate = maxDateToBooking(arrivalDate);
  return moment(limitDate).isAfter(moment());
}

export function groupCartItemsByCategory(items: CartItem[]): GroupedCategory[] {
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

export default function isInViewport(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function getNumberMonth(date?: string | Date | null) {
  return moment(date).utc().month() + 1;
}
