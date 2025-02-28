import { useMemo } from 'react';
import { Item } from '@magnetic/interfaces';
import { GallerySlider, Text } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  sortImagesByPosition,
} from '@magnetic/utils';
import { useCartStore } from '../../../hooks/useCartStore';
import ItemHandleBookButtons from '../item-handle-book-buttons';

interface Props {
  item: Item;
  onClickBookNow: (amount: number) => void;
}

function ItemChefsCard({ item, onClickBookNow }: Props) {
  const { name, priceInCents, category, images, id, serviceId } = item;
  const { cart } = useCartStore();
  const cartItem = useMemo(
    () => cart.find((cartItem) => cartItem.item.id === id),
    [cart, id]
  );

  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(images);
  }, [images]);

  const texts: Record<string, string> = {
    default: 'per week',
    'chef-single': 'per person',
  };

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 will-change-transform`}
    >
      <div className="relative w-full rounded-2xl overflow-hidden">
        <GallerySlider
          href={`/services/${serviceId}/item/${id}`}
          galleryImgs={imagesSorted}
          classImage="h-[200px]"
          uniqueID={`ExperiencesCard_${id}`}
        />
        <div className="p-5 space-y-4">
          <div className="w-full pb-2 flex flex-col gap-3">
            <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
              {name}
            </p>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1 items-center">
              <Text className="text-base font-semibold">
                {centsToEurosWithCurrency(priceInCents)}
              </Text>
              {category?.formType && (
                <Text className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                  {`/ ${texts[category.formType] || texts.default}`}
                </Text>
              )}
            </div>
            <ItemHandleBookButtons
              item={item}
              onClicBookNow={onClickBookNow}
              currentAmount={cartItem?.quantity || 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemChefsCard;
