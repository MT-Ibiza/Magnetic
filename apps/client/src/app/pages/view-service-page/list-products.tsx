import { Item, Service } from '@magnetic/interfaces';
import ItemCard from '../../components/items/item-card';
import { groupItemsByCategory } from '@magnetic/utils';
import { Alert, Button } from '@magnetic/ui';
import { Link } from 'react-router-dom';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';
import { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';

interface Props {
  items: Item[];
  availableInPlan: boolean;
  service: Service;
}
function ListProducts(props: Props) {
  const { items, availableInPlan, service } = props;
  const [openFormModal, setOpenFormModal] = useState(false);
  const { setSelectedItem, currentSelectItem } = useApp();
  const { addProductToCart, addServiceToCart } = useCart();
  const { addItem, removeItem, cart, totalDrinks } = useCartStore();

  const servicesAllowMultipleSelection = ['drinks'];
  const itemsGroup = groupItemsByCategory(items);
  const isDrinksService = service.serviceType === 'drinks';

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
    if (currentSelectItem) {
      addServiceToCart.mutate(
        { itemId: currentSelectItem.id, quantity: newVal, formData },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            closeForm();
            addItem({
              id: cartItem.id,
              item: currentSelectItem,
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

  const handleAddProduct = (quantity: number, formData?: any) => {
    if (currentSelectItem) {
      const newVal = quantity;

      addProductToCart.mutate(
        { itemId: currentSelectItem.id, quantity: newVal, formData },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            closeForm();
            addItem({
              id: cartItem.id,
              item: currentSelectItem,
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

  const handleRemoveProduct = (quantity: number) => {
    const newVal = quantity;
    if (newVal >= 0 && currentSelectItem) {
      addProductToCart.mutate(
        { itemId: currentSelectItem.id, quantity: newVal },
        {
          onSuccess: () => {
            removeItem(currentSelectItem.id);
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
                <ItemCard
                  service={service}
                  item={item}
                  allowSelectMultiple={servicesAllowMultipleSelection.includes(
                    service.serviceType
                  )}
                  onClickBookNow={() => {
                    if (availableInPlan) {
                      openForm();
                      setSelectedItem(item);
                    } else {
                      //@ts-ignore
                      document.getElementById('modal_upgrade').showModal();
                    }
                  }}
                  onClickAdd={(amount) => {
                    if (availableInPlan) {
                      setSelectedItem(item);
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
          {openFormModal && (
            <RenderBookingForm
              type={
                currentSelectItem?.category?.formType || service.serviceType
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
