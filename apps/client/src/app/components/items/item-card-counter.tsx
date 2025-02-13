import React, { useState } from 'react';
import { Item, Service } from '@magnetic/interfaces';
import { Alert, Button, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { Link } from 'react-router-dom';
import RenderBookingForm from '../services/booking-forms/render-booking-form';

interface Props {
  item: Item;
  service: Service;
  availableInPlan: boolean;
  noFillForm: boolean;
}

function ItemCardCounter(props: Props) {
  const { item, availableInPlan, service, noFillForm } = props;
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
    document.getElementById('modal_form').showModal();
  };

  const closeForm = () => {
    //@ts-ignore
    document.getElementById('modal_form').close();
  };

  return (
    <>
      <div className="border rounded-xl border-neutral-200 p-4 space-y-4 shadow-sm hover:border-primary-700 transition-shadow">
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
          <div className="flex flex-col w-full">
            <div className="w-full pb-2 flex justify-between items-start">
              <h2 className="text-lg font-semibold text-primary">
                {item.name}
              </h2>
              <h2 className="text-lg font-semibold text-secondary">
                {centsToEurosWithCurrency(item.priceInCents)}
              </h2>
            </div>
            <Text className="line-clamp-4">{item.description}</Text>

            {noFillForm ? (
              <div className="flex items-center justify-end gap-4 mt-4">
                <button
                  className="bg-gray-100 text-black px-2 py-[0.5px] rounded-lg hover:bg-primary-dark transition-colors"
                  onClick={() => {
                    if (availableInPlan) {
                      handleRemoveItem(productCart?.quantity || 0);
                    } else {
                      //@ts-ignore
                      document.getElementById('modal_upgrade').showModal();
                    }
                  }}
                >
                  -
                </button>
                <span className="text-md font-semibold">
                  {productCart?.quantity || 0}
                </span>
                <button
                  onClick={() => {
                    if (availableInPlan) {
                      // handleAddItem(productCart?.quantity || 0);
                      openForm();
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
                    onClick={() => {
                      handleRemoveItem(productCart?.quantity || 0);
                    }}
                  >
                    - Remove Cart
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
      <dialog id="modal_form" className="modal">
        <div className="modal-box p-8 w-full max-w-5xl">
          <RenderBookingForm
            type={service.serviceType}
            formData={{
              data: {},
              serviceId: service.id,
              itemId: item.id,
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

export default ItemCardCounter;
