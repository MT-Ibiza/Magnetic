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
  selectedDate?: string;
  priceMonthNumber: number;
  url?: string;
}

function ItemBoatCard({ item, priceMonthNumber, selectedDate, url }: Props) {
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
    () => getPriceRange([...seasonPrices, { priceInCents }]),
    [seasonPrices, priceInCents]
  );

  const displayPrice = monthPrice?.priceInCents ?? priceInCents;
  const baseUrl = url || `/services/${serviceId}/item/${id}`;
  const urlPage = selectedDate ? `${baseUrl}?date=${selectedDate}` : baseUrl;

  return (
    <div className="nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900">
      <div className="relative w-full rounded-2xl overflow-hidden">
        <GallerySlider
          href={urlPage}
          galleryImgs={imagesSorted}
          classImage="h-[200px]"
          uniqueID={`ExperiencesCard_${id}`}
        />
        <div className="p-5 space-y-4">
          <div className="space-y-2 flex flex-col">
            <Link to={urlPage} className="capitalize text-base font-medium">
              <span className="line-clamp-1">{name}</span>
            </Link>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
              {secondName && <span>{secondName} |</span>}
              <span>{capacity} pax</span>
            </div>
          </div>
          <div className="responsive-card-item flex justify-between mt-5">
            <div className=" flex gap-1 items-center">
              <Text className="text-base font-semibold">
                {selectedDate
                  ? `${centsToEurosWithCurrency(displayPrice)}`
                  : priceRange.low === priceRange.high
                  ? `${centsToEurosWithCurrency(priceInCents)}`
                  : `From ${centsToEurosWithCurrency(
                      priceRange.low
                    )} - ${centsToEurosWithCurrency(priceRange.high)}`}
              </Text>
              <Text className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                /day
              </Text>
            </div>
            <Button href={urlPage}>Details</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemBoatCard;
