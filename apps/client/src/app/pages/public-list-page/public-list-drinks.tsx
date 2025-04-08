import { FormSubmitParams, Item } from '@magnetic/interfaces';
import {
  Alert,
  DrinksDeliveryBookingForm,
  EmptyState,
  Modal,
} from '@magnetic/ui';
import { groupItemsByCategory } from '@magnetic/utils';
import React, { useMemo, useState } from 'react';
import { PiBeerBottleFill } from 'react-icons/pi';
import ItemDrinkCard from '../../components/items/cards/item-drink-card';
import { useGuestCartActions } from '../../hooks/useGuestCartActions';
import { useGuestCartStore } from '../../hooks/useGuestCartStore';

interface Props {
  items: Item[];
}

function PublicListDrinks(props: Props) {
  const { items } = props;
  const itemsGroup = useMemo(() => groupItemsByCategory(items || []), [items]);
  const [openModal, setOpenModal] = useState(false);
  const { addDrinkToCart } = useGuestCartActions();
  const { addItem, removeItem, cart, totalDrinks } = useGuestCartStore();
  const [currentItemSelected, setCurrentItemSelected] = useState<Item>();

  const openForm = () => {
    setOpenModal(true);
  };

  const closeForm = () => {
    setOpenModal(false);
  };

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

  const cartMap = useMemo(
    () => new Map(cart.map((cartItem) => [cartItem.item.id, cartItem])),
    [cart]
  );

  const handleSaveForm = (data: FormSubmitParams<any>) => {
    const { form, quantity } = data;
    const newVal = quantity || 1;
    if (currentItemSelected) {
      addDrinkToCart.mutate(
        {
          itemId: currentItemSelected.id,
          quantity: newVal,
          formData: form,
        },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            closeForm();
            addItem({
              id: cartItem.id,
              item: currentItemSelected,
              quantity: newVal,
              formData: form,
              priceInCents: cartItem.priceInCents,
              type: 'drinks',
            });
            showAlert('Drink added to the cart', 'success');
          },
          onError: () => {
            showAlert('Failed to add drink to the cart', 'error');
          },
        }
      );
    }
  };

  const handleSaveAddDrink = (item: Item, quantity: number, formData?: any) => {
    const newVal = quantity;
    addDrinkToCart.mutate(
      { itemId: item.id, quantity: newVal, formData },
      {
        onSuccess: (response) => {
          const { cartItem } = response;
          closeForm();
          addItem({
            id: cartItem.id,
            item: item,
            quantity: newVal,
            priceInCents: cartItem.priceInCents,
            type: 'drinks',
            formData,
          });
          showAlert('Drink added to the cart', 'success');
        },
        onError: () => {
          showAlert('Failed to add drink to the cart', 'error');
        },
      }
    );
  };

  const handleSaveRemoveProduct = (item: Item, quantity: number) => {
    const newVal = quantity;
    if (newVal >= 0) {
      addDrinkToCart.mutate(
        { itemId: item.id, quantity: newVal },
        {
          onSuccess: (response) => {
            const { cartItem } = response;
            removeItem(cartItem.id);
            showAlert('Drink removed to the cart', 'success');
          },
          onError: () => {
            showAlert('Failed to remove drink to the cart', 'error');
          },
        }
      );
    }
  };

  function handleAddItem(item: Item, amount: number) {
    setCurrentItemSelected(item);
    if (totalDrinks === 0) {
      openForm();
    } else {
      handleSaveAddDrink(item, amount, undefined);
    }
  }

  function handleRemoveItem(item: Item, amount: number) {
    handleSaveRemoveProduct(item, amount);
  }

  return (
    <>
      {items.length !== 0 ? (
        <div>
          {itemsGroup.map((group, index) => (
            <div key={index} className="pt-[30px]">
              <h2 className="md:text-lg lg:text-[22px] font-semibold">
                {group.category}
              </h2>
              <div className="grid pt-[30px] gap-3 lg:gap-6 md:gap-8 grid-cols-2 lg:grid-cols-5">
                {group.items.map((item, index) => (
                  <ItemDrinkCard
                    key={index}
                    item={item}
                    onClickAdd={(amount) => {
                      handleAddItem(item, amount);
                    }}
                    onClickRemove={(amount) => {
                      handleRemoveItem(item, amount);
                    }}
                    cartItemAmount={
                      cartMap.get(item.id)
                        ? cartMap.get(item.id)?.quantity || 0
                        : 0
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={PiBeerBottleFill}
          title="No drinks found"
          description="Try adjusting your search!"
        ></EmptyState>
      )}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <Modal open={openModal}>
        <DrinksDeliveryBookingForm
          onSubmit={handleSaveForm}
          formData={{
            serviceId: 1,
          }}
          onCancel={closeForm}
        />
      </Modal>
    </>
  );
}

export default PublicListDrinks;
