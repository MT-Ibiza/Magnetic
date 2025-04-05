import { FormSubmitParams, Item } from '@magnetic/interfaces';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';
import { searchDrinks } from '../../apis/api-drinks';
import { DrinkSearchAttributes } from 'libs/interfaces/src/lib/drinks';
import ItemDrinkCard from '../../components/items/cards/item-drink-card';
import {
  Alert,
  DrinksDeliveryBookingForm,
  EmptyState,
  GridSkeleton,
} from '@magnetic/ui';
import { groupItemsByCategory } from '@magnetic/utils';
import Modal from '../../components/modal';
import { useAuth } from '../../hooks/useAuth';
import { PiBeerBottleFill } from 'react-icons/pi';
import FilterDrinks from '../view-service-page/filter-drinks';

interface Props {
  categories: { id: number; name: string }[];
}

function PublicListDrinks(props: Props) {
  const { categories } = props;
  const [openFormModal, setOpenFormModal] = useState(false);
  // const { addDrinkToCart } = useCart();
  const { addItem, removeItem, cart, totalDrinks } = useCartStore();

  const [currentItemSelected, setCurrentItemSelected] = useState<Item>();
  const [searchParams, setSearchParams] = useState<DrinkSearchAttributes>({
    categoriesIds: undefined,
    name: undefined,
  });

  const toggleModal = () => {
    setOpenFormModal((prevState) => !prevState);
  };

  const openForm = () => {
    setOpenFormModal(true);
  };

  const closeForm = () => {
    setOpenFormModal(false);
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
      // addDrinkToCart.mutate(
      //   {
      //     itemId: currentItemSelected.id,
      //     quantity: newVal,
      //     formData: form,
      //   },
      //   {
      //     onSuccess: (response) => {
      //       const { cartItem } = response;
      //       closeForm();
      //       addItem({
      //         id: cartItem.id,
      //         item: currentItemSelected,
      //         quantity: newVal,
      //         formData: form,
      //         priceInCents: cartItem.priceInCents,
      //         type: 'drinks',
      //       });
      //       showAlert('Drink added to the cart', 'success');
      //     },
      //     onError: () => {
      //       showAlert('Failed to add drink to the cart', 'error');
      //     },
      //   }
      // );
    }
  };

  const handleSaveAddDrink = (item: Item, quantity: number, formData?: any) => {
    const newVal = quantity;
    // addDrinkToCart.mutate(
    //   { itemId: item.id, quantity: newVal, formData },
    //   {
    //     onSuccess: (response) => {
    //       const { cartItem } = response;
    //       closeForm();
    //       addItem({
    //         id: cartItem.id,
    //         item: item,
    //         quantity: newVal,
    //         priceInCents: cartItem.priceInCents,
    //         type: 'drinks',
    //         formData,
    //       });
    //       showAlert('Drink added to the cart', 'success');
    //     },
    //     onError: () => {
    //       showAlert('Failed to add drink to the cart', 'error');
    //     },
    //   }
    // );
  };

  const handleSaveRemoveProduct = (item: Item, quantity: number) => {
    const newVal = quantity;
    if (newVal >= 0) {
      // addDrinkToCart.mutate(
      //   { itemId: item.id, quantity: newVal },
      //   {
      //     onSuccess: (response) => {
      //       const { cartItem } = response;
      //       removeItem(cartItem.id);
      //       showAlert('Drink removed to the cart', 'success');
      //     },
      //     onError: () => {
      //       showAlert('Failed to remove drink to the cart', 'error');
      //     },
      //   }
      // );
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
          classNameContent="grid pt-[30px] gap-6 md:gap-8 grid-cols-2 lg:grid-cols-5"
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
        </>
      )}
      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
      {/* <Modal open={openFormModal}>
        <DrinksDeliveryBookingForm
          user={user}
          onSubmit={handleSaveForm}
          formData={{
            serviceId,
          }}
          onCancel={toggleModal}
        />
      </Modal> */}
    </div>
  );
}
export default PublicListDrinks;
