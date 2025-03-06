import { useMemo } from 'react';
import { BoatBase, Item } from '@magnetic/interfaces';
import { Button, GallerySlider, Text } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  getPriceRange,
  sortImagesByPosition,
} from '@magnetic/utils';
import { Link } from 'react-router-dom';

interface Props {
  item: Item;
  isFilterItem: boolean;
  priceMonthNumber: number;
}

function ItemBoatCard({ item, priceMonthNumber, isFilterItem }: Props) {
  const {
    name,
    priceInCents,
    boatAttributes,
    seasonPrices,
    images,
    serviceId,
    id,
  } = item;
  const { secondName, capacity } = boatAttributes as BoatBase;

  const imagesSorted = useMemo(() => sortImagesByPosition(images), [images]);
  const monthPrice = useMemo(
    () =>
      seasonPrices.find(
        (seasonPrice) => seasonPrice.startMonth === priceMonthNumber
      ),
    [seasonPrices, priceMonthNumber]
  );
  const priceRange = useMemo(
    //@ts-ignore
    () => getPriceRange([...seasonPrices, { priceInCents }]),
    [seasonPrices, priceInCents]
  );

  const displayPrice = monthPrice?.priceInCents ?? priceInCents;

  return (
    <div className="nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900">
      <div className="relative w-full rounded-2xl overflow-hidden">
        <GallerySlider
          href={`/services/${serviceId}/item/${id}`}
          galleryImgs={imagesSorted}
          classImage="h-[200px]"
          uniqueID={`ExperiencesCard_${id}`}
        />
        <div className="p-5 space-y-4">
          <div className="space-y-2 flex flex-col">
            <Link
              to={`/services/${serviceId}/item/${id}`}
              className="capitalize text-base font-medium"
            >
              <span className="line-clamp-1">{name}</span>
            </Link>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              {secondName && <span>{secondName} |</span>}
              <span>{capacity} pax</span>
            </div>
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex gap-1 items-center">
              <Text className="text-base font-semibold">
                {isFilterItem
                  ? `From ${centsToEurosWithCurrency(displayPrice)}`
                  : priceRange.low === priceRange.high
                  ? `From ${centsToEurosWithCurrency(priceInCents)}`
                  : `From ${centsToEurosWithCurrency(
                      priceRange.low
                    )} - ${centsToEurosWithCurrency(priceRange.high)}`}
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /day
              </Text>
            </div>
            <Button href={`/services/${serviceId}/item/${id}`}>
              View Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemBoatCard;
