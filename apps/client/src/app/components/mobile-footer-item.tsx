import React, { useState } from 'react';
import { Item } from '@magnetic/interfaces';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { Button } from '@magnetic/ui';

interface Props {
  item: Item;
  startDate: Date | null;
}

const MobileItemSticky = (props: Props) => {
  const { item, startDate } = props;
  const { variants } = item;

  const [priceSelected, setPriceSelected] = useState(item.priceInCents);

  return (
    <div className="block lg:hidden fixed bottom-0 inset-x-0 py-2 sm:py-3 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-6000 z-40">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            Price: {centsToEurosWithCurrency(priceSelected)}
          </span>
        </div>
        <Button size={2} radius="full" href={'/checkout'}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default MobileItemSticky;
