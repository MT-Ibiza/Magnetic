import { useMemo } from 'react';
import { Item, Service } from '@magnetic/interfaces';
import { GallerySlider } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  sortImagesByPosition,
} from '@magnetic/utils';
import { useCartStore } from '../../hooks/useCartStore';
import { Link } from 'react-router-dom';
import ItemCounterButtons from './item-counter-buttons';
import ItemHandleBookButtons from './item-handle-book-buttons';
import ItemDescription from './item-description';

interface Props {
  item: Item;
  service: Service;
  allowSelectMultiple: boolean;
  onClickBookNow: () => void;
  onClickAdd: (amount: number) => void;
  onClickRemove: (amount: number) => void;
}

function ItemCard(props: Props) {
  const {
    item,
    service,
    allowSelectMultiple,
    onClickBookNow,
    onClickAdd,
    onClickRemove,
  } = props;
  const { cart } = useCartStore();
  const productCart = cart.find((cartItem) => cartItem.item.id === item.id);
  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(item.images);
  }, [item.images]);

  const servicesNoDetails = ['drinks'];
  const isDrinksService = service.serviceType === 'drinks';

  return (
    <div
      className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 will-change-transform`}
    >
      <div className="relative w-full rounded-2xl overflow-hidden">
        <Link
          to={
            servicesNoDetails.includes(service.serviceType)
              ? '#'
              : `/services/${item.serviceId}/item/${item.id}`
          }
        >
          <GallerySlider
            galleryImgs={imagesSorted}
            classImage={`${isDrinksService ? 'h-[200px]' : 'h-[250px]'}   `}
            uniqueID={`ExperiencesCard_${item.id}`}
          />
        </Link>
        <div className={'p-5 space-y-4'}>
          <div className="space-y-2">
            <div className="flex items-center">
              <ItemDescription serviceType={service.serviceType} item={item} />
            </div>
          </div>
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-end">
            {allowSelectMultiple ? (
              <ItemCounterButtons
                currentAmount={productCart?.quantity || 0}
                onClickAdd={onClickAdd}
                onClickRemove={onClickRemove}
              />
            ) : (
              <ItemHandleBookButtons
                item={item}
                currentAmount={productCart?.quantity || 0}
                onClickAdd={onClickBookNow}
                onClickRemove={onClickRemove}
              >
                {service.serviceType === 'boat_rental' ? (
                  <span className="text-base font-semibold">
                    {centsToEurosWithCurrency(item.priceInCents)}
                    <span className="text-sm text-neutral-500 dark:text-neutral-400 font-normal">
                      /day
                    </span>
                  </span>
                ) : (
                  <span className="text-base font-semibold">
                    {centsToEurosWithCurrency(item.priceInCents)}
                  </span>
                )}
              </ItemHandleBookButtons>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
