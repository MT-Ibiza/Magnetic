import { BookingForm, OrderItem } from '@magnetic/interfaces';
import { Button, Modal, RenderFormSummary, Text } from '@magnetic/ui';
import { centsToEurosWithCurrency } from '@magnetic/utils';

interface Props {
  booking: BookingForm;
  items: OrderItem[];
  onCancel: () => void;
}

function ModalBookingSummary(props: Props) {
  const { booking, items, onCancel } = props;

  const totalInCents = items.reduce((sum, item) => {
    if (item.type === 'childcare') {
      return sum + item.priceInCents * booking.formData.hours * item.quantity;
    }
    return sum + item.priceInCents * item.quantity;
  }, 0);
  
  return (
    <div>
      <Modal.Header>Booking Details</Modal.Header>
      <Modal.Body>
        <RenderFormSummary booking={booking} items={items} />
      </Modal.Body>
      <Modal.Footer>
        <div className="flex px-2 lg:px-0 justify-between w-full">
          <div className="flex items-center">
            <label className="text-[15px] lg:text-[16px] font-bold">
              Total {centsToEurosWithCurrency(totalInCents)}
            </label>
          </div>
          <Button
            radius="full"
            className=""
            variant="outline"
            color="neutral"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </Modal.Footer>
    </div>
  );
}

export default ModalBookingSummary;
