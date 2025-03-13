import React, { MutableRefObject, useMemo, useState } from 'react';
import { Item } from '@magnetic/interfaces';
import { centsToEurosWithCurrency, getPriceRange } from '@magnetic/utils';
import { Button } from '@magnetic/ui';

interface Props {
  item: Item;
  startDate: Date | null;
  price: number;
  isBoatCalendar?: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

const MobileItemSticky = (props: Props) => {
  const { item, startDate, price, onClick, children, isBoatCalendar } =
    props;
  const { variants } = item;
  const { priceInCents, seasonPrices } = item;

  const priceRange = useMemo(
    //@ts-ignore
    () => getPriceRange([...seasonPrices, { priceInCents }]),
    [seasonPrices, priceInCents]
  );

  const [priceSelected, setPriceSelected] = useState(item.priceInCents);

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
          {isBoatCalendar ? (
            <p className="text-xl font-semibold">
              {startDate
                ? `Price: ${centsToEurosWithCurrency(price)}`
                : `From ${centsToEurosWithCurrency(
                    priceRange.low
                  )} - ${centsToEurosWithCurrency(priceRange.high)}`}
            </p>
          ) : (
            <span className="block text-xl font-semibold">
              Price: {centsToEurosWithCurrency(priceSelected)}
            </span>
          )}
        </div>
        <Button size={2} radius="full" onClick={onClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default MobileItemSticky;
