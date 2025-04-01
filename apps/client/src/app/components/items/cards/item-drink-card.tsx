import { useMemo } from 'react';
import { Item, Service } from '@magnetic/interfaces';
import { GallerySlider, Text, Tooltip } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  sortImagesByPosition,
} from '@magnetic/utils';
import ItemCounterButtons from '../item-counter-buttons';

interface Props {
  item: Item;
  cartItemAmount: number;
  onClickAdd: (amount: number) => void;
  onClickRemove: (amount: number) => void;
}

function ItemDrinkCard({
  item,
  onClickAdd,
  onClickRemove,
  cartItemAmount,
}: Props) {
  const { name, priceInCents, drinkAttributes } = item;

  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(item.images);
  }, [item.images]);

  return (
    <div
      className={`nc-CarCard w-full min-h-[380px] lg:min-h-[360px] group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 will-change-transform`}
    >
      <div className="relative w-full rounded-3xl overflow-hidden">
        <GallerySlider
          galleryImgs={imagesSorted}
          classImage="h-[200px]"
          uniqueID={`ExperiencesCard_${item.id}`}
        />
        <div className="p-5 flex flex-col justify-end space-y-4">
          <div className="space-y-2 flex flex-col">
            <Tooltip content={name}>
              <p className="line-clamp-2 capitalize text-md font-semibold text-primary cursor-pointer">
                {name}
              </p>
            </Tooltip>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              {drinkAttributes?.size && (
                <>
                  <span>{drinkAttributes?.size}</span>
                  <span>x</span>
                </>
              )}
              <span>{drinkAttributes?.units}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex flex-col gap-[5px] items-center lg:flex-row lg:justify-between px-5">
        <Text className="text-base font-semibold">
          {centsToEurosWithCurrency(priceInCents)}
        </Text>
        <ItemCounterButtons
          currentAmount={cartItemAmount}
          onClickAdd={onClickAdd}
          onClickRemove={onClickRemove}
        />
      </div>
    </div>
  );
}

export default ItemDrinkCard;
