import { Item } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency, getPriceRange } from '@magnetic/utils';
import { useMemo } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { getNumberMonth } from '../../utils';

interface Props {
  item: Item;
  startDate: Date | null;
  price: number;
  onClick: () => void;
}

function BookBoatCard(props: Props) {
  const { item, startDate, onClick, price } = props;
  const { priceInCents, seasonPrices } = item;

  const priceRange = useMemo(
    //@ts-ignore
    () => getPriceRange([...seasonPrices, { priceInCents }]),
    [seasonPrices, priceInCents]
  );

  return (
    <div className="sticky bg-base-100 top-[90px] listingSectionSidebar__wrap shadow-xl">
      <div className="flex justify-between">
        <p className="text-2xl font-semibold">
          {startDate
            ? `Price: ${centsToEurosWithCurrency(price)}`
            : `From ${centsToEurosWithCurrency(
                priceRange.low
              )} - ${centsToEurosWithCurrency(priceRange.high)}`}
        </p>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="border border-neutral-200 dark:border-neutral-700 rounded-2xl">
          <div className="p-3 w-full flex-1 z-10 flex relative items-center space-x-3 focus:outline-none ">
            <div className="text-neutral-300 dark:text-neutral-400">
              <FaCalendarAlt className="w-5 h-5 lg:w-7 lg:h-7 text-neutral-300 dark:text-neutral-400" />
            </div>
            <div className="flex-grow text-left">
              <span className="block xl:text-lg font-semibold">
                {startDate?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: '2-digit',
                }) || 'Date'}
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                {'Select date'}
              </span>
            </div>
          </div>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
      </div>
      <Button size={2} radius="full" onClick={onClick}>
        Book Now
      </Button>
    </div>
  );
}

export default BookBoatCard;
