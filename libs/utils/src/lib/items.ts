import { Item } from '@magnetic/interfaces';

export function groupItemsByCategory(
  items: Item[]
): { category: string; items: any[]; position: number; categoryId: number }[] {
  const categoryMap: {
    [key: string]: { items: any[]; position: number; categoryId: number };
  } = {};

  items.forEach((item) => {
    const categoryName: string = item.category?.name || 'unknown';
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
