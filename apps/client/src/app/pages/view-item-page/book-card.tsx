import { Item } from '@magnetic/interfaces';
import { Button, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useState } from 'react';

interface Props {
  item: Item;
  onClick: () => void;
}

function BookCard(props: Props) {
  const { item, onClick } = props;
  const { variants, service } = item;

  const [priceSelected, setPriceSelected] = useState(item.priceInCents);
  const isTransfer = service.serviceType === 'transfer';

  const variantOptions = variants.map((variant) => {
    return {
      value: variant.id,
      text: isTransfer
        ? `${item.name} - ${variant.name} - (${variant.capacity} pax)`
        : `${item.name} - ${variant.name}`,
    };
  });

  const itemName = isTransfer
    ? `${item.name} (${item.transferAttributes?.capacity || 4} pax)`
    : item.name;

  return (
    <div className="sticky bg-base-100 top-[90px] listingSectionSidebar__wrap shadow-xl">
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          Price: {centsToEurosWithCurrency(priceSelected)}
        </span>
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
            <option value="">{itemName}</option>
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
