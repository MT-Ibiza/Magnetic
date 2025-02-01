import { Button } from '@headlessui/react';
import { Text } from '@magnetic/ui';
import { GoPencil } from 'react-icons/go';
import RenderBookingForm from '../../components/services/booking-forms/render-booking-form';
import { Item } from '@magnetic/interfaces';

interface Props {
  serviceType: string;
  item: Item;
  formData?: any;
}

function CheckoutItemEdit(props: Props) {
  const { serviceType, item, formData } = props;

  const closeForm = () => {
    //@ts-ignore
    document.getElementById(`modal-form-${item.id}`).close();
  };

  const openForm = () => {
    //@ts-ignore
    document.getElementById(`modal-form-${item.id}`).showModal();
  };

  return (
    <>
      <div className="flex gap-3 hover:text-orange-500 mt-1">
        <Button className="flex gap-1 items-center" onClick={openForm}>
          <GoPencil size={12} />
          <Text size="1" className="text-gray-500 hover:text-orange-500">
            Edit
          </Text>
        </Button>
      </div>
      <dialog id={`modal-form-${item.id}`} className="modal">
        <div className="modal-box p-8 w-full max-w-5xl">
          <RenderBookingForm
            type={serviceType}
            formData={formData}
            onSubmit={(data) => {
              // handleAddItem(0, data);
            }}
            onClose={closeForm}
          />
        </div>
      </dialog>
    </>
  );
}

export default CheckoutItemEdit;
