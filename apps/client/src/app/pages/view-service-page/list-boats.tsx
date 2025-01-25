import { BoatsSearchAttributes, Item } from '@magnetic/interfaces';
import ItemBoatCard from '../../components/items/item-boat-card';
import FilterBoats from './filter-boats';
import { useQuery } from '@tanstack/react-query';
import { searchBoats } from '../../apis/api-boats';
import { useState } from 'react';

interface Props {
  items: Item[];
  availableInPlan: boolean;
}

function ListBoats(props: Props) {
  const { items, availableInPlan } = props;

  const [searchParams, setSearchParams] = useState<BoatsSearchAttributes>({
    boatType: undefined,
    guests: undefined,
    size: undefined,
    crew: undefined,
    priceGreaterThan: undefined,
    priceLessThan: undefined,
  });

  const {
    data: boats,
    isLoading,
    isError,
  } = useQuery<Item[]>({
    queryKey: ['boats', searchParams],
    queryFn: async () => {
      return searchBoats(searchParams);
    },
  });

  return (
    <div>
      <FilterBoats
        onChangeFilters={(filters) => {
          setSearchParams(filters);
        }}
      />
      <div className="grid grid-cols-1 gap-4">
        {boats?.map((item, index) => (
          <div key={index}>
            <ItemBoatCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListBoats;
