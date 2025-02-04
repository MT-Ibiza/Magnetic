import { BoatsSearchAttributes, Item } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import ItemBoatCard from '../../components/items/item-boat-card';
import FilterBoats from './filter-boats';
import { useQuery } from '@tanstack/react-query';
import { searchBoats } from '../../apis/api-boats';
import { useState } from 'react';
import ItemCounter from '../../components/items/item-counter';

interface Props {
  items: Item[];
  availableInPlan: boolean;
  service: any;
}

function ListBoats(props: Props) {
  const { items, availableInPlan, service } = props;

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
            <ItemCounter
              service={service}
              item={item}
              availableInPlan={availableInPlan}
              noFillForm={false}
            >
              <BoatInfo
                name={item.name}
                secondName={item.boatAttributes?.secondName}
                guests={item.boatAttributes?.guests || 0}
              />
            </ItemCounter>
          </div>
        ))}
      </div>
    </div>
  );
}

const BoatInfo = ({
  name,
  guests,
  secondName,
}: {
  name: string;
  guests: number;
  secondName?: string;
}) => (
  <div>
    <h2 className="text-lg font-semibold text-primary">{name}</h2>
    {secondName && (
      <Text size="1" className="mb-2">
        {secondName}
      </Text>
    )}
    <Text size="1">{`Max Pax: ${guests}`}</Text>
  </div>
);

export default ListBoats;
