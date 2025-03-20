import { Button } from '@headlessui/react';
import { Text } from '@magnetic/ui';
import { GoPencil } from 'react-icons/go';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';
import { FormSubmitParams, Item } from '@magnetic/interfaces';
import Modal from '../../components/modal';
import { useState } from 'react';
import { useApp } from '../../hooks/useApp';
import { useCart } from '../../hooks/useCart';

interface Props {
  formType: string;
  item: Item;
  formData?: any;
  cartItemId: number;
}

function CheckoutItemEdit(props: Props) {
  const { formType, item, cartItemId, formData } = props;
  const [openFormModal, setOpenFormModal] = useState(false);
  const { setSelectedItem } = useApp();
  const { editFormItemCart, refetch } = useCart();

  const handleEditForm = (cartItemData: FormSubmitParams<any>) => {
    editFormItemCart.mutate(
      {
        cartItemId,
        itemId: item.id,
        formData: cartItemData.form,
        quantity: cartItemData.quantity,
        variantId: cartItemData.variantId,
        seasonId: cartItemData.seasonId,
      },
      {
        onSuccess: () => {
          setOpenFormModal(false);
          refetch();
        },
        onError: () => {
          // showAlert('Failed to remove item to the cart', 'error');
        },
      }
    );
  };

  return (
    <>
      <div className="flex gap-3 hover:text-orange-500 mt-1">
        <Button
          className="flex gap-1 items-center"
          onClick={() => {
            setOpenFormModal(true);
            setSelectedItem(item);
          }}
        >
          <GoPencil size={12} />
          <Text size="1" className="text-gray-500 hover:text-orange-500">
            Edit
          </Text>
        </Button>
      </div>
      <Modal open={openFormModal} id={`modal-form-${cartItemId}`}>
        <RenderBookingForm
          type={formType}
          formData={formData}
          onSubmit={handleEditForm}
          onClose={() => {
            setOpenFormModal(false);
          }}
        />
      </Modal>
    </>
  );
}

export default CheckoutItemEdit;
