import { Item } from '@magnetic/interfaces';

export function groupItemsByCategory(
  items: Item[]
): { category: string; items: any[]; position: number }[] {
  const categoryMap: { [key: string]: { items: any[]; position: number } } = {};

  items.forEach((item) => {
    const categoryName: string = item.category?.name || 'unknown';
    const categoryPosition: number = item.category?.position || 0;

    if (!categoryMap[categoryName]) {
      categoryMap[categoryName] = { items: [], position: categoryPosition };
    }

    categoryMap[categoryName].items.push(item);
  });

  const groupedItems = Object.keys(categoryMap)
    .map((category) => ({
      category,
      items: categoryMap[category].items,
      position: categoryMap[category].position,
    }))
    .sort((a, b) => a.position - b.position);

  return groupedItems;
}
