import { Item } from '@magnetic/interfaces';
import {
  centsToEurosWithCurrency,
  groupItemsByCategory,
  placeholderItemImage,
} from '@magnetic/utils';
import { Button, Text } from '@magnetic/ui';
import { useEffect, useState } from 'react';

interface Props {
  items: Item[];
  onClick: (item: Item) => void;
  searchTerm: string;
  selectedItems: Item[];
}

function ListDrinks(props: Props) {
  const { items, onClick, searchTerm, selectedItems } = props;

  const [sortedItems, setSortedItems] = useState<
    {
      category: string;
      items: Item[];
    }[]
  >([]);

  useEffect(() => {
    if (items.length > 0) {
      const itemsGroup = groupItemsByCategory(items);
      setSortedItems(itemsGroup);
    }
  }, [items]);

  return (
    <div className="flex flex-col gap-3">
      {sortedItems.map((group, index) => (
        <div
          className="border-gray-300 collapse collapse-arrow border"
          key={index}
        >
          <input type="checkbox" className="peer" />
          <div className="collapse-title font-semibold">{group.category}</div>
          <div className="collapse-content flex flex-col gap-3">
            {group.items.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 justify-between items-center p-2 border rounded-md"
              >
                <div className="flex gap-3">
                  <img
                    src={
                      item.images.length > 0
                        ? item.images[0].url
                        : placeholderItemImage
                    }
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <div className="mt-2">
                    <Text size="1">{item.name}</Text>
                    <Text size="1" className="text-gray-500">
                      {centsToEurosWithCurrency(item.priceInCents)}
                    </Text>
                  </div>
                </div>
                <Button
                  onClick={() => onClick(item)}
                  disabled={selectedItems.some((i) => i.id === item.id)}
                >
                  + Add
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListDrinks;
