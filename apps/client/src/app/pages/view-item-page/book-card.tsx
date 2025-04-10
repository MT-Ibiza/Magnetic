import { Item } from '@magnetic/interfaces';
import { Text } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  createVariantOptions,
  createVariantTransferOptions,
} from '@magnetic/utils';
import { useEffect, useState } from 'react';
import BookButton from '../../components/bookings/book-button';

interface Props {
  item: Item;
  onClick: () => void;
}

function BookCard(props: Props) {
  const { item, onClick } = props;
  const { variants, service } = item;
  const [priceSelected, setPriceSelected] = useState(item.priceInCents);
  const isTransfer = service.serviceType === 'transfer';

  useEffect(() => {
    if (item) {
      setPriceSelected(item.priceInCents);
    }
  }, [item]);

  const variantOptions = isTransfer
    ? createVariantTransferOptions(variants, item)
    : createVariantOptions(variants, item);

  return (
    <div className="sticky bg-base-100 top-[90px] listingSectionSidebar__wrap shadow-xl">
      <div className="flex justify-between">
        <span className="text-3xl font-semibold">
          Price: {centsToEurosWithCurrency(priceSelected)}
        </span>
      </div>
      {variantOptions.length > 0 && (
        <>
          <Text>Select option</Text>
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
            {variantOptions.map((option, index) => (
              <option value={option.value} key={index}>
                {option.text}
              </option>
            ))}
          </select>
        </>
      )}

      <BookButton size={2} radius="full" onClick={onClick} />
    </div>
  );
}

export default BookCard;
