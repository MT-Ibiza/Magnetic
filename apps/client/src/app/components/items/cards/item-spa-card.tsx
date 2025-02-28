import { useMemo } from 'react';
import { Item } from '@magnetic/interfaces';
import { GallerySlider, Text } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  sortImagesByPosition,
} from '@magnetic/utils';
import ItemHandleBookButtons from '../item-handle-book-buttons';

interface Props {
  item: Item;
  cartItemAmount: number;
  onClickBookNow: (amount: number) => void;
}

function ItemSpaCard(props: Props) {
  const { item, onClickBookNow, cartItemAmount } = props;
  const { name, priceInCents, id, images } = item;

  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(images);
  }, [images]);

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
              <span className="">60 min</span>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <Text className="text-base font-semibold">
              {centsToEurosWithCurrency(priceInCents)}
            </Text>
            <ItemHandleBookButtons
              item={item}
              onClicBookNow={onClickBookNow}
              currentAmount={cartItemAmount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemSpaCard;
