import { Item } from '@magnetic/interfaces';
import { EmptyState, GridSkeleton } from '@magnetic/ui';
import React, { useState } from 'react';
import { FaShip } from 'react-icons/fa';
import FilterBoats from '../view-service-page/filter-boats';
import ItemBoatCard from '../../components/items/cards/item-boat-card';
import { getNumberMonth } from '@magnetic/utils';

interface Props {
  items: Item[];
  slug: string;
}

function PublicListBoats(props: Props) {
  const { items, slug } = props;
  const defaultMonthNumber = getNumberMonth();
  const [currentMonthNumber, setCurrentMonthNumber] =
    useState(defaultMonthNumber);

  return (
    <div className="flex flex-col gap-[15px] lg:gap-[40px]">
      <FilterBoats onChangeFilters={(filters) => {}} />

      {items.length !== 0 ? (
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div key={index}>
              <ItemBoatCard
                selectedDate={undefined}
                item={item}
                priceMonthNumber={currentMonthNumber}
                url={`/list/${slug}/${item.id}`}
              />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={FaShip}
          title="No boats found"
          description="Adjust your filters and try again"
        ></EmptyState>
      )}
    </div>
  );
}

export default PublicListBoats;
