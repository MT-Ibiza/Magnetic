import { BoatsSearchAttributes, Item } from '@magnetic/interfaces';
import FilterBoats from './filter-boats';
import { useQuery } from '@tanstack/react-query';
import { searchBoats } from '../../apis/api-boats';
import { useState } from 'react';
import ItemBoatCard from '../../components/items/cards/item-boat-card';
import { getNumberMonth } from '../../utils';
import { EmptyState, GridSkeleton } from '@magnetic/ui';
import { FaShip } from 'react-icons/fa';

interface Props {
  slugGuestMode?: string;
}

function ListBoats(props: Props) {
  const { slugGuestMode } = props;
  const [isFilterBoats, setIsFilterBoats] = useState(false);
  const defaultMonthNumber = getNumberMonth();
  const [currentMonthNumber, setCurrentMonthNumber] =
    useState(defaultMonthNumber);

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
      const result = searchBoats(searchParams);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return result;
    },
  });

  return (
    <div className="flex flex-col gap-[15px] lg:gap-[40px]">
      <FilterBoats
        onChangeFilters={(filters) => {
          if (filters.from) {
            const newMonthNumber = getNumberMonth(filters.from);
            setCurrentMonthNumber(newMonthNumber);
            setIsFilterBoats(true);
          }
          setSearchParams(filters);
        }}
      />
      {isLoading ? (
        <GridSkeleton totalItems={6} />
      ) : (
        <>
          {boats?.length !== 0 ? (
            <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {boats?.map((item, index) => (
                <div key={index}>
                  <ItemBoatCard
                    selectedDate={searchParams.from}
                    item={item}
                    priceMonthNumber={currentMonthNumber}
                    url={
                      slugGuestMode
                        ? `/list/${slugGuestMode}/${item.id}`
                        : undefined
                    }
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
        </>
      )}
    </div>
  );
}
export default ListBoats;
