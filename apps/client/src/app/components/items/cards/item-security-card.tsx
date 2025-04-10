import { useMemo } from 'react';
import { Item } from '@magnetic/interfaces';
import { GallerySlider, Text } from '@magnetic/ui';
import { 
  centsToEurosWithCurrency,
  sortImagesByPosition,
  getPriceRange,
  getRangeByField,
} from '@magnetic/utils';
import ItemHandleBookButtons from '../item-handle-book-buttons';

interface Props {
  item: Item;
  cartItemAmount: number;
  onClickBookNow: (amount: number) => void;
}

function ItemSecurityCard(props: Props) {
  const { item, onClickBookNow, cartItemAmount } = props;
  const { name, priceInCents, variants, securityAttributes } = item;
  const hours = securityAttributes?.hours || 1;
  const variantsWithHours = variants.map((v) => {
    return {
      value: v.hours || 1,
    };
  });

  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(item.images);
  }, [item.images]);

  const priceRange = useMemo(
    () => getPriceRange([...variants, { priceInCents }]),
    [variants, priceInCents]
  );

  const hoursRange = useMemo(
    () => getRangeByField([...variantsWithHours, { value: hours }]),
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
            {/* <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              <span className="">
                {hoursRange.low === hoursRange.high
                  ? `${hoursRange.low} hours`
                  : `${hoursRange.low} - ${hoursRange.high} hours`}
              </span>
            </div> */}
          </div>
          <div className="flex justify-between mt-5">
          <div className="flex gap-1 items-center">
              <Text className="text-base font-semibold">
                {centsToEurosWithCurrency(priceInCents)}
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                / per hour
              </Text>
            </div>
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

export default ItemSecurityCard;
