import { BoatsSearchAttributes, Item } from '@magnetic/interfaces';
import FilterBoats from './filter-boats';
import { useQuery } from '@tanstack/react-query';
import { searchBoats } from '../../apis/api-boats';
import { useState } from 'react';
import ItemBoatCard from '../../components/items/cards/item-boat-card';
import BoatCharterBookingForm from '../../components/services/booking-forms/boat-charter-form';
import { useApp } from '../../hooks/useApp';
import { useCart } from '../../hooks/useCart';
import { useCartStore } from '../../hooks/useCartStore';

interface Props {}

function ListBoats(props: Props) {
  const {} = props;
  const { setSelectedItem, currentSelectItem } = useApp();
  const [openFormModal, setOpenFormModal] = useState(false);
  const { addServiceToCart } = useCart();
  const { addItem } = useCartStore();

  const [searchParams, setSearchParams] = useState<BoatsSearchAttributes>({
    price_gt: undefined,
    price_lt: undefined,
    capacity_gt: undefined,
    capacity_lt: undefined,
    size_gt: undefined,
    size_lt: undefined,
    from: undefined,
    to: undefined,
  });

  const {
    data: boats,
    isLoading,
    isError,
  } = useQuery<Item[]>({
    queryKey: ['boats', searchParams],
    queryFn: async () => {
      return searchBoats(searchParams);
    },
  });

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

  return (
    <>
      <div className="flex flex-col gap-[15px] lg:gap-[40px]">
        <FilterBoats
          onChangeFilters={(filters) => {
            setSearchParams(filters);
          }}
        />
        <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {boats?.map((item, index) => (
            <div key={index}>
              <ItemBoatCard
                item={item}
                onClickBookNow={() => {
                  setSelectedItem(item);
                  openForm();
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <dialog id={`modal-form-product`} className="modal">
        <div className="modal-box p-8 w-full max-w-5xl">
          {openFormModal && (
            <BoatCharterBookingForm onSubmit={() => {}} onCancel={closeForm} />
          )}
        </div>
      </dialog>
    </>
  );
}
export default ListBoats;
