import { Item } from '@magnetic/interfaces';
import { EmptyState } from '@magnetic/ui';
import { groupItemsByCategory } from '@magnetic/utils';
import React, { useMemo } from 'react';
import { PiBeerBottleFill } from 'react-icons/pi';
import ItemDrinkCard from '../../components/items/cards/item-drink-card';

interface Props {
  items: Item[];
}

function PublicListDrinks(props: Props) {
  const { items } = props;
  const itemsGroup = useMemo(() => groupItemsByCategory(items || []), [items]);

  return (
    <div>
      {items.length !== 0 ? (
        <div>
          {itemsGroup.map((group, index) => (
            <div key={index} className="pt-[30px]">
              <h2 className="md:text-lg lg:text-[22px] font-semibold">
                {group.category}
              </h2>
              <div className="grid pt-[30px] gap-3 lg:gap-6 md:gap-8 grid-cols-2 lg:grid-cols-5">
                {group.items.map((item, index) => (
                  <ItemDrinkCard
                    key={index}
                    item={item}
                    onClickAdd={(amount) => {
                      // handleAddItem(item, amount);
                    }}
                    onClickRemove={(amount) => {
                      // handleRemoveItem(item, amount);
                    }}
                    cartItemAmount={1}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={PiBeerBottleFill}
          title="No drinks found"
          description="Try adjusting your search!"
        ></EmptyState>
      )}
    </div>
  );
}

export default PublicListDrinks;
