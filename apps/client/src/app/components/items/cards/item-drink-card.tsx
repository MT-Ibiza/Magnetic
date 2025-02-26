import { useMemo } from 'react';
import { Item, Service } from '@magnetic/interfaces';
import { GallerySlider, Text } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  sortImagesByPosition,
} from '@magnetic/utils';
import ItemCounterButtons from '../item-counter-buttons';
import { useCartStore } from '../../../hooks/useCartStore';

interface Props {
  item: Item;
  onClickAdd: (amount: number) => void;
  onClickRemove: (amount: number) => void;
}

function ItemDrinkCard(props: Props) {
  const { item, onClickAdd, onClickRemove } = props;
  const { name, priceInCents, drinkAttributes } = item;
  const { cart } = useCartStore();
  const cartItem = cart.find((cartItem) => cartItem.item.id === item.id);

  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(item.images);
  }, [item.images]);

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 will-change-transform`}
    >
      <div className="relative w-full rounded-2xl overflow-hidden">
        <GallerySlider
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
              {drinkAttributes?.size && (
                <>
                  <span>{drinkAttributes?.size}</span>
                  <span>x</span>
                </>
              )}
              <span>{drinkAttributes?.units}</span>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <Text className="text-base font-semibold">
              {centsToEurosWithCurrency(priceInCents)}
            </Text>
            <ItemCounterButtons
              currentAmount={cartItem?.quantity || 0}
              onClickAdd={onClickAdd}
              onClickRemove={onClickRemove}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDrinkCard;
