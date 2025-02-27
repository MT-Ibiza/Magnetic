import { Button } from '@headlessui/react';
import { Text } from '@magnetic/ui';
import { GoPencil } from 'react-icons/go';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';
import { Item } from '@magnetic/interfaces';
import Modal from '../../components/modal';
import { useState } from 'react';

interface Props {
  formType: string;
  item: Item;
  formData?: any;
}

function CheckoutItemEdit(props: Props) {
  const { formType, item, formData } = props;
  const [openFormModal, setOpenFormModal] = useState(false);

  return (
    <>
      <div className="flex gap-3 hover:text-orange-500 mt-1">
        <Button
          className="flex gap-1 items-center"
          onClick={() => {
            setOpenFormModal(true);
          }}
        >
          <GoPencil size={12} />
          <Text size="1" className="text-gray-500 hover:text-orange-500">
            Edit
          </Text>
        </Button>
      </div>
      <Modal open={openFormModal} id={`modal-form-${item.id}`}>
        <RenderBookingForm
          type={formType}
          formData={formData}
          onSubmit={(data) => {
            // handleAddItem(0, data);
          }}
          onClose={() => {
            setOpenFormModal(false);
          }}
        />
      </Modal>
    </>
  );
}

export default CheckoutItemEdit;
