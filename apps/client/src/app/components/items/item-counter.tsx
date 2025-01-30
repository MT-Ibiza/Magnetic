import React, { useState } from 'react';
import { Item, Service } from '@magnetic/interfaces';
import { Alert, Button, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { Link } from 'react-router-dom';
import RenderBookingForm from '../services/booking-forms/render-booking-form';
import { MdCancel } from 'react-icons/md';
interface Props {
  item: Item;
  service: Service;
  availableInPlan: boolean;
  noFillForm: boolean;
  children?: React.ReactNode;
}

function ItemCounter(props: Props) {
  const { item, availableInPlan, service, noFillForm, children } = props;
  const { addItemToCart } = useCart();
  const { addItem, removeItem, cart } = useCartStore();
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

  const handleAddItem = (quantity: number, formData?: any) => {
    const newVal = quantity + 1;
    addItemToCart.mutate(
      { itemId: item.id, quantity: newVal, formData },
      {
        onSuccess: () => {
          closeForm();
          addItem({
            id: item.id,
            item: item,
            quantity: newVal,
          });
          showAlert('Product added to the cart', 'success');
        },
        onError: () => {
          showAlert('Failed to add product to the cart', 'error');
        },
      }
    );
  };

  const handleRemoveItem = (quantity: number) => {
    const newVal = quantity - 1;

    if (newVal >= 0) {
      addItemToCart.mutate(
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
      <div className="flex justify-between border rounded-xl border-neutral-200 p-4 space-y-4 shadow-sm hover:border-primary-700 transition-shadow">
        <div className="flex gap-5">
          <img
            className="object-cover rounded-lg h-[125px] w-[125px]"
            src={
              item.images && item.images.length > 0
                ? item.images[0].url
                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSC8p9y72JP4pkbhibsAZkGeQU4ZL5Gp6L8VjYTvXgRvzm4t3xY2wbR5KFLOOQT5apKwv4&usqp=CAU'
            }
            alt={item.name}
          />
          {children ? (
            <div>{children}</div>
          ) : (
            <DefaultProductInfo
              name={item.name}
              priceInCents={item.priceInCents}
              description={item.description}
            />
          )}
        </div>
        <div className="flex flex-col items-end">
          <h2 className="text-lg font-semibold text-secondary">
            {centsToEurosWithCurrency(item.priceInCents)}
          </h2>
          {noFillForm ? (
            <div className="flex items-center justify-end gap-4 mt-4">
              <button
                className="bg-gray-100 text-black px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
                onClick={() => {
                  if (availableInPlan) {
                    handleRemoveItem(productCart?.quantity || 0);
                  } else {
                    handleAddItem(0, undefined);
                  }
                }}
              >
                -
              </button>
              <p
                className={`text-md font-semibold ${
                  !!productCart?.quantity && 'text-green-600'
                }`}
              >
                {productCart?.quantity || 0}
              </p>
              <button
                onClick={() => {
                  if (availableInPlan) {
                    handleAddItem(0, undefined);
                  } else {
                    //@ts-ignore
                    document.getElementById('modal_upgrade').showModal();
                  }
                }}
                className="bg-gray-100 text-black px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
              >
                +
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-4 mt-4">
              <Link to={`item/${item.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
              {productCart?.quantity === 1 ? (
                <Button
                  className="flex gap-1"
                  color="neutral"
                  onClick={() => {
                    handleRemoveItem(productCart?.quantity || 0);
                  }}
                >
                  <MdCancel />
                  Cancel Booking
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    openForm();
                    // handleAddItem(productCart?.quantity || 0);
                  }}
                >
                  Book Now
                </Button>
              )}
            </div>
          )}
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
            type={service.serviceType}
            formData={{
              data: {},
              serviceId: service.id,
            }}
            onSubmit={(data) => {
              handleAddItem(0, data);
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
  priceInCents,
  description,
}: {
  name: string;
  priceInCents: number;
  description: string;
}) => (
  <div className="w-full pb-2 flex flex-col gap-3">
    <h2 className="text-lg font-semibold text-primary">{name}</h2>
    <Text className="line-clamp-4">{description}</Text>
  </div>
);

export default ItemCounter;
