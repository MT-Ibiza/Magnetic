import { useMemo, useState } from 'react';
import { Item, Service } from '@magnetic/interfaces';
import { Alert, Button, GallerySlider } from '@magnetic/ui';
import {
  centsToEurosWithCurrency,
  sortImagesByPosition,
} from '@magnetic/utils';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { Link } from 'react-router-dom';
import RenderBookingForm from '../services/booking-forms/render-booking-form';
import ItemCounterButtons from './item-counter-buttons';
import ItemHandleBookButtons from './item-handle-book-buttons';
import { useApp } from '../../hooks/useApp';
import ItemDescription from './item-description';

interface Props {
  item: Item;
  service: Service;
  availableInPlan: boolean;
  allowSelectMultiple: boolean;
}

function ItemCard(props: Props) {
  const { item, availableInPlan, service, allowSelectMultiple } = props;
  const { addProductToCart, addServiceToCart } = useCart();
  const { addItem, removeItem, cart, totalDrinks } = useCartStore();
  const { setSelectedItem } = useApp();
  const productCart = cart.find((cartItem) => cartItem.item.id === item.id);
  const imagesSorted = useMemo(() => {
    return sortImagesByPosition(item.images);
  }, [item.images]);

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

  const formType = item.category?.formType || service.serviceType;
  const isDrinksService = service.serviceType === 'drinks';
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
          {/* href={`/services/${item.serviceId}/item/${item.id}`} */}
          <GallerySlider
            galleryImgs={imagesSorted}
            classImage={`${isDrinksService ? 'h-[200px]' : 'h-[250px]'}   `}
            uniqueID={`ExperiencesCard_${item.id}`}
          />
          <div className={'p-5 space-y-4'}>
            <div className="space-y-2">
              <div className="flex items-center">
                <ItemDescription
                  serviceType={service.serviceType}
                  item={item}
                />
              </div>
            </div>
            <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
            <div className="flex flex-col items-end">
              {allowSelectMultiple ? (
                <ItemCounterButtons
                  currentAmount={productCart?.quantity || 0}
                  onClickAdd={(amount) => {
                    if (availableInPlan) {
                      if (
                        totalDrinks === 0 &&
                        service.serviceType === 'drinks'
                      ) {
                        openForm();
                      } else {
                        handleAddProduct(amount, undefined);
                      }
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
                />
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
              serviceId: service.id,
            }}
            onSubmit={(data, quantity) => {
              const amount = quantity || 1;
              handleAddService(amount, data);
            }}
            onClose={closeForm}
          />
        </div>
      </dialog>
    </>
  );
}

export default ItemCard;
