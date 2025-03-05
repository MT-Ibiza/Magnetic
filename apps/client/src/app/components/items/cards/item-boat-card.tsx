import { useMemo } from 'react';
import { BoatBase, Item } from '@magnetic/interfaces';
import { GallerySlider, Text } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  sortImagesByPosition,
} from '@magnetic/utils';
import { useCartStore } from '../../../hooks/useCartStore';
import ItemHandleBookButtons from '../item-handle-book-buttons';
import { Link } from 'react-router-dom';

interface Props {
  item: Item;
  priceMonthNumber: number;
  onClickBookNow: (amount: number) => void;
}

function ItemBoatCard(props: Props) {
  const { item, onClickBookNow, priceMonthNumber } = props;
  const { name, priceInCents, boatAttributes, seasonPrices } = item;
  const { secondName, capacity } = boatAttributes as BoatBase;
  const { cart } = useCartStore();
  const cartItem = cart.find((cartItem) => cartItem.item.id === item.id);
  const monthPrice = seasonPrices.find(
    (seasonPrice) => seasonPrice.startMonth === priceMonthNumber
  );
  const price = monthPrice ? monthPrice.priceInCents : priceInCents;
  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(item.images);
  }, [item.images]);

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
            <Link
              to={`/services/${item.serviceId}/item/${item.id}`}
              className={`capitalize ${'text-base font-medium'}`}
            >
              <span className="line-clamp-1">{name}</span>
            </Link>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              {secondName && (
                <>
                  <span className="">{secondName}</span>
                  <span>|</span>
                </>
              )}
              <span className="">{capacity} pax </span>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1 items-center">
              <Text className="text-base font-semibold">
                {centsToEurosWithCurrency(price)}
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /day
              </Text>
            </div>
            <ItemHandleBookButtons
              item={item}
              onClickBookNow={onClickBookNow}
              currentAmount={cartItem?.quantity || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemBoatCard;
