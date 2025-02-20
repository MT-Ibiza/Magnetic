import { useState } from 'react';
import { Item, Service } from '@magnetic/interfaces';
import {
  Alert,
  Button,
  CarouselImages,
  GallerySlider,
  SaleOffBadge,
  Text,
} from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { Link } from 'react-router-dom';
import RenderBookingForm from '../services/booking-forms/render-booking-form';
import ItemCounterButtons from './item-counter-buttons';
import ItemHandleBookButtons from './item-handle-book-buttons';
import { FaUsers } from 'react-icons/fa';
import { useApp } from '../../hooks/useApp';

interface Props {
  item: Item;
  service: Service;
  availableInPlan: boolean;
  noFillForm: boolean;
}

function ItemCard(props: Props) {
  const { item, availableInPlan, service, noFillForm } = props;
  const { addProductToCart, addServiceToCart } = useCart();
  const { addItem, removeItem, cart } = useCartStore();
  const { setSelectedItem } = useApp();
  const productCart = cart.find((cartItem) => cartItem.item.id === item.id);
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning';
  } | null>(null);

  const showAlert = (
    message: string,
    type: 'success' | 'error' | 'warning'
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const customDetailsServices = ['drinks', 'chefs', 'transfer', 'boat_rental'];
  const formType = item.category?.formType || service.serviceType;
  const handleAddProduct = (quantity: number, formData?: any) => {
    const newVal = quantity;
    addProductToCart.mutate(
      { itemId: item.id, quantity: newVal, formData },
      {
        onSuccess: (response) => {
          const { cartItem } = response;
          closeForm();
          addItem({
            id: cartItem.id,
            item: item,
            quantity: newVal,
            formData,
          });
          showAlert('Product added to the cart', 'success');
        },
        onError: () => {
          showAlert('Failed to add product to the cart', 'error');
        },
      }
    );
  };

  const handleRemoveProduct = (quantity: number) => {
    const newVal = quantity;
    if (newVal >= 0) {
      addProductToCart.mutate(
        { itemId: item.id, quantity: newVal },
        {
          onSuccess: () => {
            removeItem(item.id);
            showAlert('Item removed to the cart', 'success');
          },
          onError: () => {
            showAlert('Failed to remove item to the cart', 'error');
          },
        }
      );
    }
  };

  const handleAddService = (quantity: number, formData?: any) => {
    const newVal = quantity;
    addServiceToCart.mutate(
      { itemId: item.id, quantity: newVal, formData },
      {
        onSuccess: (response) => {
          const { cartItem } = response;
          closeForm();
          addItem({
            id: cartItem.id,
            item: item,
            quantity: newVal,
            formData,
          });
          showAlert('Product added to the cart', 'success');
        },
        onError: () => {
          showAlert('Failed to add product to the cart', 'error');
        },
      }
    );
  };

  const openForm = () => {
    //@ts-ignore
    document.getElementById(`modal-form-${item.id}`).showModal();
  };

  const closeForm = () => {
    //@ts-ignore
    document.getElementById(`modal-form-${item.id}`).close();
  };

  return (
    <>
      <div
        className={`nc-CarCard group relative border border-neutral-200 dark:border-neutral-700 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow bg-white dark:bg-neutral-900 will-change-transform`}
      >
        <div className="relative w-full rounded-2xl overflow-hidden">
          <GallerySlider
            href={`/services/${item.serviceId}/item/${item.id}`}
            galleryImgs={item.images}
            uniqueID={`ExperiencesCard_${item.id}`}
          />
          {/* {item.priceInCents && (
            <SaleOffBadge className="absolute right-3 top-3" item={item} />
          )} */}
          <div className={'p-5 space-y-4'}>
            <div className="space-y-2">
              <div className="flex items-center">
                {customDetailsServices.includes(service.serviceType) ? (
                  <>
                    {service.serviceType === 'drinks' && (
                      <DrinkInfo
                        name={item.name}
                        size={item.drinkAttributes?.size}
                        quantity={item.drinkAttributes?.units || 0}
                      />
                    )}
                    {service.serviceType === 'chefs' && (
                      <ChefInfo name={item.name} />
                    )}
                    {service.serviceType === 'transfer' && (
                      <TransferInfo
                        capacity={item.boatAttributes?.capacity || 0}
                        name={item.name}
                      />
                    )}
                    {service.serviceType === 'boat_rental' && (
                      <BoatInfo
                        name={item.name}
                        price={centsToEurosWithCurrency(item.priceInCents)}
                        secondName={item.boatAttributes?.secondName}
                        capacity={item.boatAttributes?.capacity || 0}
                      />
                    )}
                  </>
                ) : (
                  <DefaultProductInfo
                    name={item.name}
                    description={item.description}
                  />
                )}
              </div>
            </div>
            <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="flex flex-col items-end">
              {noFillForm ? (
                <ItemCounterButtons
                  currentAmount={productCart?.quantity || 0}
                  onClickAdd={(amount) => {
                    if (availableInPlan) {
                      handleAddProduct(amount, undefined);
                    } else {
                      //@ts-ignore
                      document.getElementById('modal_upgrade').showModal();
                    }
                  }}
                  onClickRemove={(amount) => {
                    if (availableInPlan) {
                      handleRemoveProduct(amount);
                    } else {
                      //@ts-ignore
                      document.getElementById('modal_upgrade').showModal();
                    }
                  }}
                >
                  {service.serviceType === 'drink' ? (
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
                </ItemCounterButtons>
              ) : (
                <ItemHandleBookButtons
                  item={item}
                  currentAmount={productCart?.quantity || 0}
                  onClickAdd={() => {
                    if (availableInPlan) {
                      openForm();
                      setSelectedItem(item);
                    } else {
                      //@ts-ignore
                      document.getElementById('modal_upgrade').showModal();
                    }
                  }}
                  onClickRemove={(amount) => {
                    handleRemoveProduct(amount);
                  }}
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
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <dialog id="modal_upgrade" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Upgrade your package</h3>
          <p className="mt-3">This service is not available in your package </p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex gap-3">
                <Button className="" variant="outline" color="neutral">
                  Close
                </Button>
                <Link to={'/packages'}>
                  <Button className="">Upgrade Now</Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <dialog id={`modal-form-${item.id}`} className="modal">
        <div className="modal-box p-8 w-full max-w-5xl">
          <RenderBookingForm
            type={formType}
            formData={{
              data: {},
              serviceId: service.id,
            }}
            onSubmit={(data) => {
              handleAddService(1, data);
            }}
            onClose={closeForm}
          />
        </div>
      </dialog>
    </>
  );
}

const DefaultProductInfo = ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => (
  <div className="w-full pb-2 flex flex-col gap-3">
    <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
      {name}
    </p>
    <Text className="line-clamp-4 flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
      {description}
    </Text>
  </div>
);

const DrinkInfo = ({ name, size, quantity }: { name: string; size?: string, quantity?: number }) => (
  <div className="space-y-2 flex flex-col">
    <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
      {name}
    </p>
    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
    {quantity && (
        <>
          <span className="">{quantity} units</span>
          <span>-</span>
        </>
      )}
      <span className="">{size} size </span>
      </div>
  </div>
);

const ChefInfo = ({ name }: { name: string }) => (
  <div>
    <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
      {name}
    </p>
  </div>
);

const TransferInfo = ({
  name,
  capacity,
}: {
  name: string;
  capacity: number;
}) => (
  <div className="space-y-2 flex flex-col">
    <p className="line-clamp-1 capitalize text-lg font-semibold text-primary">
      {name}
    </p>
    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
      <span className="">{capacity} capacity </span>
    </div>
  </div>
);

const BoatInfo = ({
  name,
  capacity,
  secondName,
  price,
}: {
  name: string;
  capacity: number;
  secondName?: string;
  price?: string;
}) => (
  <div className="space-y-2 flex flex-col">
    <h2 className={`capitalize ${'text-base font-medium'}`}>
      <span className="line-clamp-1">{name}</span>
    </h2>
    {/* {secondName && (
      <span className="text-sm text-neutral-500 dark:text-neutral-400">
        {secondName}
      </span>
    )} */}
    {/* <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
      <FaUsers className="text-neutral-500 text-lg" /> {capacity}
    </span> */}
    <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-2">
      {secondName && (
        <>
          <span className="">{secondName}</span>
          <span>-</span>
        </>
      )}
      <span className="">{capacity} capacity </span>
    </div>
  </div>
);

export default ItemCard;
