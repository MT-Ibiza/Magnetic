import { CartItem, Item } from '@magnetic/interfaces';

export function groupItemsByCategory(
  items: Item[]
): { category: string; items: any[]; position: number; categoryId: number }[] {
  const categoryMap: {
    [key: string]: { items: any[]; position: number; categoryId: number };
  } = {};

  items.forEach((item) => {
    const categoryName: string = item.category?.name || 'No Category';
    const categoryId = item.categoryId || 0;
    const categoryPosition: number = item.category?.position || 0;

    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = {
        categoryId,
        items: [],
        position: categoryPosition,
      };
    }

    categoryMap[categoryName].items.push(item);
  });

  const groupedItems = Object.keys(categoryMap)
    .map((category) => ({
      category,
      categoryId: categoryMap[category].categoryId,
      items: categoryMap[category].items.sort(
        (a, b) => a.position - b.position
      ),
      position: categoryMap[category].position,
    }))
    .sort((a, b) => a.position - b.position);

  return groupedItems;
}

export function findICartItemDrink(carItems: CartItem[]) {
  return carItems.find((carItem) => {
    return carItem.type === 'drinks' && carItem.formData;
  });
}

export const placeholderItemImage =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU';

export const TODAY_DATE = new Date().toISOString().split('T')[0];
