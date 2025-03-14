import { useMemo } from 'react';
import { Item } from '@magnetic/interfaces';
import { GallerySlider, Text } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  sortImagesByPosition,
  getPriceRange,
  getCapacityRange,
} from '@magnetic/utils';
import ItemHandleBookButtons from '../item-handle-book-buttons';

interface Props {
  item: Item;
  cartItemAmount: number;
  onClickBookNow: (amount: number) => void;
}

function ItemTransferCard(props: Props) {
  const { item, onClickBookNow, cartItemAmount } = props;
  const { name, priceInCents, variants, transferAttributes } = item;
  const capacity = transferAttributes?.capacity || 4;
  const variantsWithCapacity = variants.map((v) => {
    return {
      capacity: v.capacity || 4,
    };
  });

  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(item.images);
  }, [item.images]);

  const priceRange = useMemo(
    () => getPriceRange([...variants, { priceInCents }]),
    [variants, priceInCents]
  );

  const capacityRange = useMemo(
    () => getCapacityRange([...variantsWithCapacity, { capacity }]),
    [variants, priceInCents]
  );

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 will-change-transform`}
    >
      <div className="relative w-full rounded-2xl overflow-hidden">
        <GallerySlider
          href={`/services/${item.serviceId}/item/${item.id}`}
          galleryImgs={imagesSorted}
          classImage="h-[200px]"
          uniqueID={`ExperiencesCard_${item.id}`}
        />
        <div className="p-5 space-y-4">
          <div className="space-y-2 flex flex-col">
            <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
              {name}
            </p>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              <span className="">
                {capacityRange.low === capacityRange.high
                  ? `${capacityRange.low} pax`
                  : `${capacityRange.low} - ${capacityRange.high} pax`}
              </span>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <Text className="text-base font-semibold">
              {priceRange.low === priceRange.high
                ? `${centsToEurosWithCurrency(priceInCents)}`
                : `From ${centsToEurosWithCurrency(
                    priceRange.low
                  )} - ${centsToEurosWithCurrency(priceRange.high)}`}
            </Text>
            <ItemHandleBookButtons
              item={item}
              onClickBookNow={onClickBookNow}
              currentAmount={cartItemAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemTransferCard;
