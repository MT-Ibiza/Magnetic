import { useEffect, useState } from 'react';
import { Button } from '@magnetic/ui';
import { groupItemsByCategory, placeholderItemImage } from '@magnetic/utils';
import { Item } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';

interface Props {
  drinks: Item[];
}

function DrinksListHandle({ drinks }: Props) {
  const [sortedItems, setSortedItems] = useState<
    {
      category: string;
      items: Item[];
    }[]
  >([]);

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  useEffect(() => {
    if (drinks.length > 0) {
      const itemsGroup = groupItemsByCategory(drinks);
      setSortedItems(itemsGroup);
    }
  }, [drinks]);

  const handleAddItem = (item: Item) => {
    setSelectedItems((prev) => {
      if (!prev.find((i) => i.id === item.id)) {
        return [...prev, item];
      }
      return prev;
    });
  };

  const handleRemoveItem = (id: number) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="flex gap-10">
      {/* Available items */}
      <div className="w-full bg-gray-100 p-5">
        <Text className="font-semibold text-lg mb-4">Drinks</Text>
        {sortedItems.map((group, index) => (
          <div key={index} className="mb-6">
            <Text className="font-semibold mb-3">{group.category}</Text>
            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 justify-between items-center p-2 bg-white rounded-lg shadow-md"
                >
                  <div className="flex gap-3">
                    <img
                      src={
                        item.images.length > 0
                          ? item.images[0].url
                          : placeholderItemImage
                      }
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-lg"
                    />
                    <div className="mt-2 text-center">
                      <Text size="1">{item.name}</Text>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAddItem(item)}
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
      <div className="w-full bg-gray-100 p-5">
        <Text className="font-semibold text-lg mb-4">Selected Drinks</Text>
        <div className="flex flex-col gap-5">
          {selectedItems.length === 0 && (
            <Text size="1">No drinks selected yet.</Text>
          )}
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-5 justify-between items-center p-2 bg-white rounded-lg"
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
                <div className="mt-2 text-center">
                  <Text size="1">{item.name}</Text>
                </div>
              </div>
              <Button onClick={() => handleRemoveItem(item.id)}>x</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DrinksListHandle;
