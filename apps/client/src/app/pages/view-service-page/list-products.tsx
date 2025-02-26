import { Item, Service } from '@magnetic/interfaces';
import { groupItemsByCategory } from '@magnetic/utils';
import { Alert, Button } from '@magnetic/ui';
import { Link } from 'react-router-dom';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';
import { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import ItemDrinkCard from '../../components/items/cards/item-drink-card';
import ItemDefaultCard from '../../components/items/cards/item-default-card';
import ItemTransferCard from '../../components/items/cards/item-transfer-card';
import ItemChefsCard from '../../components/items/cards/item-chefs-card';

interface Props {
  items: Item[];
  availableInPlan: boolean;
  service: Service;
}
function ListProducts(props: Props) {
  const { items, availableInPlan, service } = props;
  const { setSelectedItem } = useApp();
  const { addProductToCart, addServiceToCart } = useCart();
  const { addItem, removeItem, cart, totalDrinks } = useCartStore();
  const [openFormModal, setOpenFormModal] = useState(false);
  const [currentItemSelected, setCurrentItemSelected] = useState<Item>();

  const itemsGroup = groupItemsByCategory(items);
  const isDrinksService = service.serviceType === 'drinks';
  const { serviceType } = service;
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

  const handleAddService = (quantity: number, formData?: any) => {
    const newVal = quantity;
    if (currentItemSelected) {
      addServiceToCart.mutate(
        { itemId: currentItemSelected.id, quantity: newVal, formData },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            closeForm();
            addItem({
              id: cartItem.id,
              item: currentItemSelected,
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
    }
  };

  const handleSaveAddProduct = (
    item: Item,
    quantity: number,
    formData?: any
  ) => {
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

  const handleSaveRemoveProduct = (item: Item, quantity: number) => {
    const newVal = quantity;
    if (newVal >= 0) {
      addProductToCart.mutate(
        { itemId: item.id, quantity: newVal },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            removeItem(cartItem.id);
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
    setOpenFormModal(true);
    //@ts-ignore
    document.getElementById(`modal-form-product`).showModal();
  };

  const closeForm = () => {
    setOpenFormModal(false);
    //@ts-ignore
    document.getElementById(`modal-form-product`).close();
  };

  const customDetailsServices = ['drinks', 'chefs', 'transfer', 'boat_rental'];

  function handleAddItem(item: Item, amount: number) {
    if (availableInPlan) {
      setSelectedItem(item);
      setCurrentItemSelected(item);
      handleSaveAddProduct(item, amount, undefined);
    } else {
      //@ts-ignore
      document.getElementById('modal_upgrade').showModal();
    }
  }

  function handleRemoveItem(item: Item, amount: number) {
    if (availableInPlan) {
      handleSaveRemoveProduct(item, amount);
    } else {
      //@ts-ignore
      document.getElementById('modal_upgrade').showModal();
    }
  }

  function handleBookNow(item: Item) {
    if (availableInPlan) {
      openForm();
      setSelectedItem(item);
      setCurrentItemSelected(item);
    } else {
      //@ts-ignore
      document.getElementById('modal_upgrade').showModal();
    }
  }

  return (
    <>
      {itemsGroup.map((group, index) => (
        <div key={index} className="pt-[30px]">
          <h2 className="text-2xl font-semibold">{group.category}</h2>
          <div
            className={`grid pt-[30px] gap-6 md:gap-8 sm:grid-cols-2 ${
              isDrinksService ? 'lg:grid-cols-4' : 'lg:grid-cols-3'
            }`}
          >
            {group.items.map((item, index) => (
              <div key={index}>
                {customDetailsServices.includes(serviceType) ? (
                  <>
                    {serviceType === 'drinks' && (
                      <ItemDrinkCard
                        item={item}
                        onClickAdd={(amount) => {
                          setCurrentItemSelected(item);
                          if (totalDrinks === 0) {
                            openForm();
                          } else {
                            handleSaveAddProduct(item, amount, undefined);
                          }
                        }}
                        onClickRemove={(amount) => {
                          handleRemoveItem(item, amount);
                        }}
                      />
                    )}
                    {serviceType === 'chefs' && (
                      <ItemChefsCard
                        item={item}
                        onClickBookNow={() => {
                          handleBookNow(item);
                        }}
                      />
                    )}
                    {serviceType === 'transfer' && (
                      <ItemTransferCard
                        item={item}
                        onClickBookNow={() => {
                          handleBookNow(item);
                        }}
                      />
                    )}
                  </>
                ) : (
                  <ItemDefaultCard
                    item={item}
                    service={service}
                    onClickAdd={(amount) => {
                      handleAddItem(item, amount);
                    }}
                    onClickRemove={(amount) => {
                      handleRemoveItem(item, amount);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
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
      <dialog id={`modal-form-product`} className="modal">
        <div className="modal-box p-8 w-full max-w-5xl">
          {openFormModal && currentItemSelected && (
            <RenderBookingForm
              type={
                currentItemSelected.category?.formType || service.serviceType
              }
              formData={{
                serviceId: service.id,
              }}
              onSubmit={(data, quantity) => {
                const amount = quantity || 1;
                handleAddService(amount, data);
              }}
              onClose={closeForm}
            />
          )}
        </div>
      </dialog>
    </>
  );
}

export default ListProducts;
