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
        <div>
          {sortedItems.map((group, index) => (
            <div key={index} className="mb-6">
              <Text className="font-semibold">{group.category}</Text>

              {group.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="cursor-grab relative p-2 bg-white rounded-lg shadow-md"
                >
                  <span className="absolute top-1 right-1 bg-black text-white text-xs px-2 py-1 rounded">
                    {idx + 1}
                  </span>
                  <img
                    src={
                      item.images.length > 0
                        ? item.images[0].url
                        : placeholderItemImage
                    }
                    alt="item"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="mt-2 text-center">
                    <Text size="1">{item.name}</Text>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </CardWrapper>
    </div>
  );
}

export default NewDrinksListPage;
