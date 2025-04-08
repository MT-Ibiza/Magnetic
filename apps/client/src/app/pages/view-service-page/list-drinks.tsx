import { FormSubmitParams, Item } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import FilterDrinks from './filter-drinks';
import { searchDrinks } from '../../apis/api-drinks';
import { DrinkSearchAttributes } from 'libs/interfaces/src/lib/drinks';
import ItemDrinkCard from '../../components/items/cards/item-drink-card';
import {
  Alert,
  DrinksDeliveryBookingForm,
  EmptyState,
  GridSkeleton,
} from '@magnetic/ui';
import { groupItemsByCategory, userCanMakeBooking } from '@magnetic/utils';
import Modal from '../../components/modal';
import { useAuth } from '../../hooks/useAuth';
import { PiBeerBottleFill } from 'react-icons/pi';
import { getCurrentClient } from '../../apis/api-client';
import NoBookings from '../../components/messages/no-bookings';
import { useGuestCartActions } from '../../hooks/useGuestCartActions';
import { useGuestCartStore } from '../../hooks/useGuestCartStore';

interface Props {
  serviceId: number;
  guestMode?: boolean;
  categories: { id: number; name: string }[];
}

function ListDrinks(props: Props) {
  const { serviceId, categories, guestMode } = props;
  const [openModal, setOpenModal] = useState(false);
  const { addDrinkToCart } = guestMode ? useGuestCartActions() : useCart();
  const { addItem, removeItem, cart, totalDrinks } = guestMode
    ? useGuestCartStore()
    : useCartStore();
  const { getCurrentUser } = useAuth();
  const user = getCurrentUser();

  const [isOutDated, setIsOutDated] = useState(false);
  const [currentItemSelected, setCurrentItemSelected] = useState<Item>();
  const [searchParams, setSearchParams] = useState<DrinkSearchAttributes>({
    categoriesIds: undefined,
    name: undefined,
  });

  const toggleModal = () => {
    setOpenModal((prevState) => !prevState);
  };

  const openForm = () => {
    setOpenModal(true);
  };

  const closeForm = () => {
    setOpenModal(false);
  };

  const cartMap = useMemo(
    () => new Map(cart.map((cartItem) => [cartItem.item.id, cartItem])),
    [cart]
  );

  const {
    data: drinks,
    isLoading,
    isError,
  } = useQuery<Item[]>({
    queryKey: ['drinks', searchParams],
    queryFn: async () => {
      const result = searchDrinks(searchParams);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return result;
    },
  });

  async function checkIfCanBook() {
    try {
      const user = await getCurrentClient();
      const isValid = userCanMakeBooking(user.arrivalDate);
      setIsOutDated(!isValid);
    } catch (error) {
      setIsOutDated(true);
      toggleModal();
    }
  }

  useEffect(() => {
    if (drinks && !guestMode) {
      checkIfCanBook();
    }
  }, [drinks]);

  const itemsGroup = useMemo(
    () => groupItemsByCategory(drinks || []),
    [drinks]
  );

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

  const handleSaveDrink = (item: Item, quantity: number, formData?: any) => {
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
      handleSaveDrink(item, amount, undefined);
    }
  }

  function handleRemoveItem(item: Item, amount: number) {
    handleSaveRemoveProduct(item, amount);
  }

  async function handleSearch(filters: {
    drink?: string;
    categoriesIds?: string;
  }) {
    setSearchParams({
      name: filters.drink,
      categoriesIds: filters.categoriesIds,
    });
  }

  return (
    <div className="flex flex-col gap-[15px] lg:gap-[40px]">
      <FilterDrinks onChangeFilters={handleSearch} categories={categories} />
      {isLoading ? (
        <GridSkeleton
          totalItems={10}
          classNameContent="grid pt-[30px] gap-6 md:gap-8 grid-cols-2 lg:grid-cols-4 xl:grid-cols-5"
        />
      ) : (
        <>
          {drinks?.length !== 0 ? (
            <div>
              {itemsGroup.map((group, index) => (
                <div key={index} className="pt-[30px]">
                  <h2 className="md:text-lg lg:text-[22px] font-semibold">
                    {group.category}
                  </h2>
                  <div className="grid pt-[30px] gap-3 lg:gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
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
        </>
      )}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      <Modal open={openModal}>
        {isOutDated ? (
          <NoBookings onClose={toggleModal} />
        ) : (
          <DrinksDeliveryBookingForm
            user={user}
            onSubmit={handleSaveForm}
            formData={{
              serviceId,
            }}
            onCancel={toggleModal}
          />
        )}
      </Modal>
    </div>
  );
}
export default ListDrinks;
