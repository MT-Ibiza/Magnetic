import { Item } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { centsToEuros, centsToEurosWithCurrency } from '@magnetic/utils';
import { useState } from 'react';

interface Props {
  item: Item;
}

function BookCard(props: Props) {
  const { item } = props;
  const { variants } = item;

  const [priceSelected, setPriceSelected] = useState(item.priceInCents);

  const variantOptions = variants.map((variant) => {
    return {
      value: variant.id,
      text: `${item.name} - ${variant.name}`,
    };
  });

  return (
    <div className="sticky bg-base-100 top-[60px] listingSectionSidebar__wrap shadow-xl">
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          Price: {centsToEurosWithCurrency(priceSelected)}
        </span>
      </div>
      <div className="flex flex-col space-y-4">
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>{centsToEurosWithCurrency(priceSelected)}</span>
        </div> */}
      </div>
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
      <Button size={2} radius="full" href={'/checkout'}>
        Book Now
      </Button>
    </div>
  );
}

export default BookCard;
