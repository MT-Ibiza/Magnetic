import { useEffect, useState } from 'react';
import { Button, Input } from '@magnetic/ui';
import { placeholderItemImage } from '@magnetic/utils';
import { Item } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import ListBoats from './list-boats';
import ListDrinks from './list-drinks';

interface Props {
  items: Item[];
  onItemsChange: (items: Item[]) => void;
  listItems: Item[];
  type: string;
}

function PublicListItemsHandle({
  items,
  onItemsChange,
  listItems,
  type,
}: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState<Item[]>(listItems);

  useEffect(() => {
    onItemsChange(selectedItems);
  }, [selectedItems]);

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

  const titles = {
    boat_rental: 'Boats',
    drinks: 'Drinks',
  };

  const placeholders = {
    boat_rental: 'Search boat by name',
    drinks: 'Search drinks by name',
  };

  return (
    <div className="flex gap-10 ">
      <div className="w-full ">
        <Text className="font-semibold text-lg mb-4">
          {titles[type as 'drinks']}
        </Text>
        {type !== 'drinks' && (
          <Input
            placeholder={placeholders[type as 'drinks']}
            className="w-full mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
        {type === 'boat_rental' && (
          <div className="h-[30rem] overflow-y-scroll p-3 border rounded-md">
            <ListBoats
              items={items}
              onClick={handleAddItem}
              searchTerm={searchTerm}
              selectedItems={selectedItems}
            />
          </div>
        )}
        {type === 'drinks' && (
          <div className="h-[33rem] overflow-y-scroll p-3">
            <ListDrinks
              items={items}
              onClick={handleAddItem}
              searchTerm={searchTerm}
              selectedItems={selectedItems}
            />
          </div>
        )}
      </div>
      <div className="w-full">
        <Text className="font-semibold text-lg mb-4">
          Selected {titles[type as 'drinks']} ({selectedItems.length})
        </Text>
        <div className="flex flex-col gap-3 h-[33rem] overflow-y-scroll bg-gray-100 p-5">
          {selectedItems.length === 0 && (
            <Text size="1">No items selected yet.</Text>
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

export default PublicListItemsHandle;
