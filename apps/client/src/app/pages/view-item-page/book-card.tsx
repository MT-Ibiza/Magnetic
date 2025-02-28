import { Item } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { centsToEuros, centsToEurosWithCurrency } from '@magnetic/utils';
import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

interface Props {
  item: Item;
  startDate: Date | null;
  endDate: Date | null;
  onClick: () => void;
}

function BookCard(props: Props) {
  const { item, startDate, endDate, onClick } = props;
  const { variants } = item;

  const [priceSelected, setPriceSelected] = useState(item.priceInCents);

  const variantOptions = variants.map((variant) => {
    return {
      value: variant.id,
      text: `${item.name} - ${variant.name}`,
    };
  });

  return (
    <div className="sticky bg-base-100 top-[90px] listingSectionSidebar__wrap shadow-xl">
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          Price: {centsToEurosWithCurrency(priceSelected)}
        </span>
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
                }) || 'Add date'}
                {endDate
                  ? ' - ' +
                    endDate?.toLocaleDateString('en-US', {
                      month: 'short',
                      day: '2-digit',
                    })
                  : ''}
              </span>
              <span className="block mt-1 text-sm text-neutral-400 leading-none font-light">
                {'Pick up - Drop off'}
              </span>
            </div>
          </div>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{centsToEurosWithCurrency(priceSelected)}</span>
        </div> */}
      </div>
      {variantOptions.length > 0 && (
        <>
          <Text>Look another options</Text>
          <select
            className="select select-bordered w-full"
            onChange={(e) => {
              const value = e.target.value;
              const variant = variants.find((v) => v.id === Number(value));
              if (variant) {
                setPriceSelected(variant.priceInCents);
              } else {
                setPriceSelected(item.priceInCents);
              }
            }}
          >
            <option value="">{item.name}</option>
            {variantOptions.map((option, index) => (
              <option value={option.value} key={index}>
                {option.text}
              </option>
            ))}
          </select>
        </>
      )}

      <Button size={2} radius="full" onClick={onClick}>
        Book Now
      </Button>
    </div>
  );
}

export default BookCard;
