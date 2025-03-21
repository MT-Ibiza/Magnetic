import { FormSubmitParams, Item, Service } from '@magnetic/interfaces';
import { groupItemsByCategory } from '@magnetic/utils';
import { Alert, Button, DrinksDeliveryBookingForm } from '@magnetic/ui';
import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import Modal from '../../components/modal';
import ItemCard from '../../components/items/cards/item-card';

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
  const isDrinksService = service.serviceType === 'drinks';
  const [alert, setAlert] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning';
  } | null>(null);

  const itemsGroup = useMemo(() => groupItemsByCategory(items), [items]);

  const cartMap = useMemo(
    () => new Map(cart.map((cartItem) => [cartItem.item.id, cartItem])),
    [cart]
  );

  const showAlert = (
    message: string,
    type: 'success' | 'error' | 'warning'
  ) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAddService = (data: FormSubmitParams<any>) => {
    const { form, quantity, variantId } = data;
    const newVal = quantity || 1;
    if (currentItemSelected) {
      addServiceToCart.mutate(
        {
          itemId: currentItemSelected.id,
          quantity: newVal,
          formData: form,
          variantId,
        },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            closeForm();
            addItem({
              id: cartItem.id,
              item: currentItemSelected,
              formData: form,
              quantity: cartItem.quantity,
              priceInCents: cartItem.priceInCents,
              type: cartItem.type,
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
            formData,
            id: cartItem.id,
            item: item,
            quantity: cartItem.quantity,
            priceInCents: cartItem.priceInCents,
            type: cartItem.type,
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

  const openForm = () => setOpenFormModal(true);
  const closeForm = () => setOpenFormModal(false);

  function handleAddItem(item: Item, amount: number) {
    setCurrentItemSelected(item);
    if (isDrinksService) {
      if (totalDrinks === 0) {
        openForm();
      } else {
        handleSaveAddProduct(item, amount, undefined);
      }
    } else {
      if (availableInPlan) {
        setSelectedItem(item);
        handleSaveAddProduct(item, amount, undefined);
      } else {
        //@ts-ignore
        document.getElementById('modal_upgrade').showModal();
      }
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
              isDrinksService ? 'lg:grid-cols-5' : 'lg:grid-cols-3'
            }`}
          >
            {group.items.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
                serviceType={service.serviceType}
                cartItem={cartMap.get(item.id)}
                onClickAdd={(amount) => handleAddItem(item, amount)}
                onClickRemove={(amount) => handleRemoveItem(item, amount)}
                onClickBookNow={() => handleBookNow(item)}
              />
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
      <Modal open={openFormModal}>
        <DrinksDeliveryBookingForm
          item={currentItemSelected}
          onSubmit={handleAddService}
          onCancel={closeForm}
        />
      </Modal>
    </>
  );
}

export default ListProducts;
