import { CardWrapper } from '@magnetic/ui';
import React, { useEffect, useState } from 'react';
import { useDrinksList } from '../../hooks/useDrinksList';
import Loading from '../../components/loading';
import { ErrorText } from '../../components/error-text';
import { groupItemsByCategory, placeholderItemImage } from '@magnetic/utils';
import { Item } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';

function NewDrinksListPage() {
  const { isLoading, isError, error, drinks } = useDrinksList();

  const [sortedItems, setSortedItems] = useState<
    {
      category: string;
      items: Item[];
    }[]
  >([]);

  useEffect(() => {
    if (drinks.length > 0) {
      const itemsGroup = groupItemsByCategory(drinks);
      setSortedItems(itemsGroup);
    }
  }, [drinks]);

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorText text={error?.message || ''} />;
  }

  return (
    <div>
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <a href="/drinks-list">Drinks Lists</a>
          </li>
          <li>New List</li>
        </ul>
      </div>
      <CardWrapper className="p-6">
        <div className="flex gap-10">
          <div className="w-full bg-gray-100 p-5">
            {sortedItems.map((group, index) => (
              <div key={index} className="mb-6">
                <Text className="font-semibold mb-3">{group.category}</Text>
                <div className="flex flex-col gap-5">
                  {group.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="cursor-grab relative p-2 bg-white rounded-lg shadow-md flex gap-5"
                    >
                      <img
                        src={
                          item.images.length > 0
                            ? item.images[0].url
                            : placeholderItemImage
                        }
                        alt="item"
                        className="w-14 h-14 object-cover rounded-lg"
                      />
                      <div className="mt-2 text-center">
                        <Text size="1">{item.name}</Text>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-100 p-5">
            <Text> List (Drag and drop the drinks here)</Text>
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}

export default NewDrinksListPage;
