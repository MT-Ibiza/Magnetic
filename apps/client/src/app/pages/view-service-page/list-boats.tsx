import { BoatsSearchAttributes, Item } from '@magnetic/interfaces';
import FilterBoats from './filter-boats';
import { useQuery } from '@tanstack/react-query';
import { searchBoats } from '../../apis/api-boats';
import { useState } from 'react';
import ItemCard from '../../components/items/item-card';

interface Props {
  availableInPlan: boolean;
  service: any;
}

function ListBoats(props: Props) {
  const { availableInPlan, service } = props;

  const [searchParams, setSearchParams] = useState<BoatsSearchAttributes>({
    price_gt: undefined,
    price_lt: undefined,
    capacity_gt: undefined,
    capacity_lt: undefined,
    size_gt: undefined,
    size_lt: undefined,
    from: undefined,
    to: undefined,
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
    <div className="flex flex-col gap-[15px] lg:gap-[40px]">
      <FilterBoats
        onChangeFilters={(filters) => {
          setSearchParams(filters);
        }}
      />
      <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {boats?.map((item, index) => (
          <div key={index}>
            <ItemCard
              service={service}
              item={item}
              availableInPlan={availableInPlan}
              allowSelectMultiple={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default ListBoats;
